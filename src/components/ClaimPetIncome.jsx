// src/components/ClaimPetIncome.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import pets from "../data/pets";

const ClaimPetIncome = ({ userId, activePet, setOpals }) => {
  const [canClaim, setCanClaim] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!userId || !activePet) return;

    const checkStatus = async () => {
      setLoading(true);
      const ref = doc(db, "users", userId);
      const snap = await getDoc(ref);
      const data = snap.data();
      const lastClaim = data?.lastPetClaim || 0;
      const now = Date.now();
      const hoursElapsed = (now - lastClaim) / (1000 * 60 * 60);

      if (hoursElapsed >= 24) {
        setCanClaim(true);
      } else {
        setTimeLeft(24 - hoursElapsed);
        setCanClaim(false);
      }

      setLoading(false);
    };

    checkStatus();
  }, [userId, activePet]);

  const handleClaim = async () => {
    if (!userId || !activePet || !canClaim || isClaiming) return;

    setIsClaiming(true);

    try {
      const pet = pets.find((p) => p.name === activePet);
      const dailyReward = pet?.dailyReward || 0;

      const ref = doc(db, "users", userId);
      const snap = await getDoc(ref);
      const currentOpals = snap.data()?.opals || 0;

      await updateDoc(ref, {
        opals: currentOpals + dailyReward,
        lastPetClaim: Date.now(),
      });

      setOpals((prev) => prev + dailyReward);
      setCanClaim(false);
      setTimeLeft(24);
    } catch (err) {
      console.error("Pet claim error:", err);
    } finally {
      setIsClaiming(false);
    }
  };

  if (loading || !activePet) return null;

  return (
    <div className="w-full flex justify-center items-center mt-4">
      {canClaim ? (
        <button
          onClick={handleClaim}
          disabled={isClaiming}
          className={`px-6 py-2 rounded-lg font-semibold shadow transition text-white ${
            isClaiming
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isClaiming ? "Claiming..." : "Collect Daily 💠 Opals"}
        </button>
      ) : (
        <div className="text-center">
          <p className="text-yellow-300 font-semibold text-sm flex items-center justify-center gap-2">
            ⏳ Your pet is resting!
            <span className="text-white font-bold">
              {Math.floor(timeLeft)}h {Math.floor((timeLeft % 1) * 60)}m
            </span>
            left until next claim.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClaimPetIncome;
