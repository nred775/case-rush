import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import workers from "../data/workers";
import { useEffect, useState } from "react";

export default function ClaimWorkerIncome({ userId, profileWorkers, setBalance }) {
  const [message, setMessage] = useState("");
  const [canClaim, setCanClaim] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);

  // 💰 Only equipped workers contribute
  const totalDaily = workers
    .filter((w) => profileWorkers.includes(w.name))
    .reduce((sum, w) => sum + (w.dailyReward || 0), 0);

  useEffect(() => {
    if (!userId) return;

    const checkClaimStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();
      const now = Date.now();
      const lastClaim = data.lastDailyClaim || 0;

      if (now - lastClaim >= 86400000) {
        setCanClaim(true);
        setTimeLeft("");
      } else {
        const msLeft = 86400000 - (now - lastClaim);
        const hours = Math.floor(msLeft / 3600000);
        const mins = Math.floor((msLeft % 3600000) / 60000);
        setCanClaim(false);
        setTimeLeft(`${hours}h ${mins}m`);
      }
    };

    checkClaimStatus();
  }, [userId]);

  const claimDailyIncome = async () => {
    if (!userId || !canClaim || isClaiming) return;

    setIsClaiming(true);

    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();
      const now = Date.now();

      await updateDoc(userRef, {
        balance: (data.balance || 0) + totalDaily,
        lastDailyClaim: now,
      });

      setBalance((prev) => prev + totalDaily);
      setMessage(`✅ Claimed $${totalDaily.toLocaleString()} from your workers!`);
      setCanClaim(false);
      setTimeLeft("24h");
    } catch (err) {
      console.error("Claim error:", err);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="text-center mt-6">
      <p className="mb-2 text-blue-300 font-medium">
        💰 Equipped workers are earning you ${totalDaily.toLocaleString()} per day.
      </p>

      {canClaim ? (
        <p className="mb-2 text-green-300 font-medium">
          🎉 You can claim your daily income!
        </p>
      ) : (
        <p className="mb-2 text-yellow-300 font-medium">
          ⏳ Come back in {timeLeft} to claim again.
        </p>
      )}

      <button
        onClick={claimDailyIncome}
        disabled={!canClaim || isClaiming}
        className={`px-4 py-2 rounded text-white font-medium transition-transform ${
          canClaim && !isClaiming
            ? "bg-emerald-600 hover:bg-emerald-700 hover:scale-105"
            : "bg-gray-600 cursor-not-allowed opacity-50"
        }`}
      >
        {isClaiming ? "Claiming..." : "🎁 Claim Daily Worker Bonus"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
    </div>
  );
}
