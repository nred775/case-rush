import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Slots({
  opals,
  setOpals,
  saveUserData,
  slotsSpun,
  setSlotsSpun,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  blackjackWins,
  horseRaces,
  xp,
  setXp,
  level,
  setLevel,
  balance,
  inventory,
  ownedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  claimedRewards,
  userBadges,
  topBarButtons
}) {
    const navigate = useNavigate();

  const location = useLocation();
const { bet = 1, name: machineName = "Opal Slots", symbols: rawSymbols = "🍒💎7️⃣🍋🔔⭐🍇" } = location.state || {};
const symbols = [...rawSymbols];


  const [reels, setReels] = useState(["❔", "❔", "❔"]);
const placeholderStrip = Array(20).fill("❔");
const [reelStrips, setReelStrips] = useState([placeholderStrip, placeholderStrip, placeholderStrip]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [spinId, setSpinId] = useState(null);

  const spin = () => {
    if (spinning || bet > opals || bet < 1) return;

    const newSpinId = Date.now();
    setSpinning(true);
    setSpinId(newSpinId);
    setMessage("");

    const newOpals = opals - bet;
    setOpals(newOpals);
    if (typeof saveUserData === "function") {
  saveUserData(
    balance,            // 💵 unchanged
    inventory,          // 🎒 unchanged
    newOpals,           // 💠 reduced right now
    ownedAvatars,
    equippedAvatar,
    ownedWorkers,
    completedSets,
    xp,
    level,
    claimedRewards,
    userBadges,
    topBarButtons,
    claimedAchievements,
    wheelsSpun,
    casesOpened,
    dailyGrids,
    blackjackWins,
    horseRaces,
    slotsSpun           // ❌ don't increment yet!
  );
}


    let xpGain = 0;
    if (bet === 1) xpGain = 25;
    else if (bet === 5) xpGain = 100;
    else if (bet === 10) xpGain = 250;

    const newXp = xp + xpGain;
    const newLevel = (() => {
      let total = 0;
      for (let lvl = 1; lvl <= 120; lvl++) {
        total += 25 * lvl * lvl;
        if (newXp < total) return lvl;
      }
      return 120;
    })();

    setXp(newXp);
    setLevel(newLevel);

    const finalResult = Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)]);

    const stripLength = 60;
    const newReelStrips = finalResult.map((symbol) => {
      const strip = Array(stripLength).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)]);
      strip.push(symbol);
      return strip;
    });

    setReelStrips(newReelStrips);
    requestAnimationFrame(() => {
  setSpinId(Date.now()); // triggers the animation on next frame
});

    setTimeout(() => {
      setReels(finalResult);

      const [a, b, c] = finalResult;
      let payout = 0;
      const allThreeMatch = a === b && b === c;
      const twoMatch = a === b || b === c || a === c;

      if (allThreeMatch) {
        if (
          (machineName === "💎 Opal Classic" && a === "🍒") ||
          (machineName === "🔥 High Roller" && a === "💎") ||
          (machineName === "👑 Millionaire Spin" && a === "👑")
        ) {
          payout = bet * 10;
        } else {
          payout = bet * 5;
        }
      } else if (twoMatch) {
        payout = bet * 2;
      }

      const finalOpals = newOpals + payout;
      setOpals(finalOpals);
      setMessage(payout > 0 ? `🎉 You won ${payout} opals!` : "😢 No win, try again!");
      setSpinning(false);

      setSlotsSpun(prev => {
        const updated = prev + 1;

        if (typeof saveUserData === "function") {
          saveUserData(
  balance,
  inventory,
  finalOpals,
  ownedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  newXp,
  newLevel,
  claimedRewards,
  userBadges,
  topBarButtons,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  blackjackWins,
  horseRaces,
  updated // ✅ slotsSpun now correctly placed last
);

        }

        return updated;
      });
    }, 4000);
  };

  return (
    <div className="text-white text-center p-6 max-w-md mx-auto bg-neon-pattern rounded-xl shadow-xl border border-pink-400 backdrop-blur-md bg-opacity-20">
      <button
        onClick={() => navigate("/slots-panel")}
        className="neon-back-btn mb-4 shadow-lg"
      >
        ⬅ Back to Slot Machines
      </button>

      <h2 className="text-4xl font-extrabold mb-6 text-pink-300 drop-shadow-glow">
        {machineName}
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        {reelStrips.map((strip, i) => (
          <div
            key={i}
            className="reel-window shadow-inner rounded-lg overflow-hidden w-16 h-24 bg-black bg-opacity-30 border-pink-400"
          >
            {spinning && strip.length > 0 ? (
  <>
    {console.log("Rendering reel", i, "with", strip.length, "symbols")}
    <div
  key={`reel-${i}-${spinId}`}
  className="reel-strip will-change-transform"
  style={{
    animation: `reel-spin ${2 + i * 1}s cubic-bezier(0.1, 0.9, 0.3, 1) forwards`,
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
    minHeight: "240rem", // fixes early black flicker on phones
  }}
>

      {strip.map((symbol, j) => (
        <div
          key={j}
          className="reel-symbol text-pink-300 drop-shadow-glow glow-neon-emoji text-3xl"
        >
          {symbol}
        </div>
      ))}
    </div>
  </>
) : (
  <div className="reel-symbol text-pink-300 drop-shadow-glow glow-neon-emoji text-5xl flex items-center justify-center h-full">
    {reels[i]}
  </div>
)}

          </div>
        ))}
      </div>

      <p className="mb-4 text-pink-300 font-medium tracking-wider">🎯 Bet: {bet} 💠</p>

      <button
        onClick={spin}
        disabled={spinning || bet > opals || bet < 1}
        className="neon-spin-btn shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {message && (
        <div className="mt-4 text-lg animate-fade-in-fast text-pink-300 drop-shadow-glow font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}
