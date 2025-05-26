import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const generateGrid = (level) => {
  const grid = Array(25).fill(null).map(() => {
    // 1 in 5 chance for Boom Buddy
    // prevent Boom Buddy from spawning if already owned
if (!window?.currentUserHasBoomBuddy && Math.random() < 1 / 1000) {
  return {
    revealed: false,
    boomBuddy: true,
  };
}

    const isMoney = Math.random() < 0.5;
    let minMoney = 100, maxMoney = 500;
    let minOpals = 1, maxOpals = 3;

    if (level >= 11 && level <= 20) {
      minMoney = 10000;
      maxMoney = 50000;
      minOpals = 1;
      maxOpals = 10;
    } else if (level >= 21) {
      minMoney = 50000;
      maxMoney = 100000;
      minOpals = 5;
      maxOpals = 20;
    }

    return {
      revealed: false,
      reward: isMoney ? "$" : "💠",
      value: isMoney
        ? Math.floor(Math.random() * (maxMoney - minMoney + 1)) + minMoney
        : Math.floor(Math.random() * (maxOpals - minOpals + 1)) + minOpals,
    };
  });

  const bombIndex = Math.floor(Math.random() * 25);
  grid[bombIndex] = { revealed: false, bomb: true };
  return grid;
};


const BombGrid = ({ user, balance, opals, setBalance, setOpals }) => {
  const [grid, setGrid] = useState(null);
  const [collected, setCollected] = useState({ money: 0, opals: 0 });
  const [claimedRewards, setClaimedRewards] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [bombHitIndex, setBombHitIndex] = useState(null);
  const [showCooldownMessage, setShowCooldownMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [toastMessage, setToastMessage] = useState("");


  const checkCooldown = async () => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const data = snap.data();

    const lastTime = data?.lastBombGameTime?.toMillis?.() || 0;
    const now = Date.now();

    if (now - lastTime >= 86400000) {
      setCooldown(false);
      setShowCooldownMessage(false);
      const ownedAvatars = data?.ownedAvatars || [];
window.currentUserHasBoomBuddy = ownedAvatars.includes("Boom Buddy");

      setGrid(generateGrid(user.level || 1));
    } else {
      setCooldown(true);
      setShowCooldownMessage(true);

      const msLeft = 86400000 - (now - lastTime);
      const hours = Math.floor(msLeft / 3600000);
      const minutes = Math.floor((msLeft % 3600000) / 60000);
      setTimeLeft(`${hours}h ${minutes}m`);
    }

    setLoading(false);
  };

const handleReveal = async (index) => {
  if (!grid || grid[index].revealed || cooldown || claimed) return;

  // Flip visual first
  const newGrid = [...grid];
  newGrid[index].revealed = "flipping";
  setGrid(newGrid);

  // Delay reveal animation
  setTimeout(async () => {
    const revealedGrid = [...newGrid];
    revealedGrid[index] = { ...revealedGrid[index], revealed: true };
    setGrid(revealedGrid);

    const tile = revealedGrid[index];
    if (tile.boomBuddy) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();
  const ownedAvatars = data?.ownedAvatars || [];

  if (!ownedAvatars.includes("Boom Buddy")) {
    ownedAvatars.push("Boom Buddy");
    await setDoc(userRef, { ownedAvatars }, { merge: true });
setToastMessage("🔥 You unlocked Boom Buddy!");
setTimeout(() => setToastMessage(""), 5000); // hide after 5 sec
  }
}


    if (tile.bomb) {
      setBombHitIndex(index);
      setCollected({ money: 0, opals: 0 });

      const now = Date.now();

setTimeout(() => {
  setCooldown(true);
  setShowCooldownMessage(true);
  setTimeLeft("24h 0m");
}, 1000); // ⏱️ 1 second delay to show the bomb visually





await setDoc(doc(db, "users", user.uid), {
  lastBombGameTime: Timestamp.fromMillis(now),
}, { merge: true });


    } else {
      setCollected((prev) => ({
        money: prev.money + (tile.reward === "$" ? tile.value : 0),
        opals: prev.opals + (tile.reward === "💠" ? tile.value : 0),
      }));
    }
  }, 150);
};



  const handleStop = async () => {
    if (cooldown || claimed) return;
    setClaimed(true);

    const now = Date.now();
    const newBalance = balance + collected.money;
    const newOpals = opals + collected.opals;

    setClaimedRewards({ ...collected });

    setBalance(newBalance);
    setOpals(newOpals);

    await setDoc(doc(db, "users", user.uid), {
      lastBombGameTime: Timestamp.fromMillis(now),
      balance: newBalance,
      opals: newOpals,
    }, { merge: true });

    setTimeout(() => {
      setCooldown(true);
      setShowCooldownMessage(true);
      setTimeLeft("24h 0m");
    }, 100);
  };

  useEffect(() => {
    checkCooldown();
  }, []);

  if (loading || (cooldown && !showCooldownMessage)) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if ((cooldown || claimed) && showCooldownMessage) {
    const reward = claimedRewards || collected;
    return (
      <div className="text-white text-center mt-10 space-y-2">
        <div className="text-2xl">⏳ Come back in {timeLeft}</div>
        {(reward.money > 0 || reward.opals > 0) && (
          <div className="text-lg text-green-300 font-semibold">
            You won: ${reward.money.toLocaleString()} and 💠 {reward.opals}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 relative">
      <div className="grid grid-cols-5 gap-2">
        {grid.map((tile, i) => (
          <button
  key={i}
  onClick={() => handleReveal(i)}
  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg font-bold text-lg sm:text-xl 
    transition-transform duration-500 transform-gpu 
    ${tile.revealed ? 'rotate-y-180' : ''} 
    ${tile.revealed === true
  ? tile.boomBuddy
    ? "bg-red-900 text-white shadow-[0_0_20px_rgba(255,0,0,0.6)] animate-pulse"
  : tile.bomb
    ? `bg-red-700 text-white ${bombHitIndex === i ? 'animate-ping' : ''}`
  : tile.reward === "$"
    ? "bg-green-600 text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.4),0_0_10px_rgba(34,197,94,0.5)]"
  : "bg-blue-600 text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.4),0_0_10px_rgba(59,130,246,0.5)]"

  : "bg-gray-900 text-gray-300 hover:bg-gray-800 shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]"}

    }`}
>
  {tile.revealed === true ? (
  <div className="transform rotate-y-180">
    {tile.bomb
      ? "💣"
      : tile.boomBuddy
      ? <img src="/avatars/boom_buddy_head.png" alt="Boom Buddy" className="w-10 h-10 mx-auto" />
      : `${tile.reward}${tile.value}`}
  </div>
) : (
  "❓"
)}


</button>

        ))}
      </div>

      <button
        onClick={handleStop}
        disabled={claimed}
        className="mt-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-bold"
      >
        ✅ Stop Now & Claim
      </button>
      <div className="text-white mt-3">
        🤑 Collected: ${collected.money.toLocaleString()} & 💠 {collected.opals}
      </div>

      {bombHitIndex !== null && !showCooldownMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-red-500 text-4xl font-bold animate-pulse">
          💥 BOOM! You hit the bomb!
        </div>
      )}
      {toastMessage && (
  <div
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-fuchsia-700 via-purple-700 to-indigo-700 border-2 border-pink-400 text-white px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(255,0,255,0.6)] z-50 text-center text-lg font-bold animate-enter-bounce"
    style={{
      animation: "enterBounce 0.4s ease-out, glowPulse 1.5s ease-in-out infinite",
    }}
  >
    {toastMessage}
  </div>
)}


    </div>
  );
  
};

export default BombGrid;
