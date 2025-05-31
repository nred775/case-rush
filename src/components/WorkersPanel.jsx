// src/components/WorkersPanel.jsx
import React from "react";
import workers from "../data/workers";
import ClaimWorkerIncome from "./ClaimWorkerIncome";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function WorkersPanel({
  userId,
  currentUser,
  ownedWorkers,
  setOwnedWorkers,
  opals,
  setOpals,
  balance,
  setBalance,
  onHire,
  profileWorkers,
  setProfileWorkers,
}) {
  const handleEquip = async (workerName) => {
    if (!ownedWorkers.includes(workerName)) return;
    if (profileWorkers.includes(workerName)) return;

    const updated = [...profileWorkers];
    if (updated.length < 4) {
      updated.push(workerName);
    } else {
      updated[3] = workerName;
    }

    setProfileWorkers(updated);

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { profileWorkers: updated });
      } catch (err) {
        console.error("Failed to assign worker:", err);
      }
    }
  };

  const handleUnequip = async (workerName) => {
    const updated = profileWorkers.filter((name) => name !== workerName);
    setProfileWorkers(updated);

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { profileWorkers: updated });
      } catch (err) {
        console.error("Failed to unassign worker:", err);
      }
    }
  };

  const handleFire = async (workerName, refundAmount) => {
    const updatedOwned = ownedWorkers.filter((name) => name !== workerName);
    const updatedProfile = profileWorkers.filter((name) => name !== workerName);

    setOwnedWorkers(updatedOwned);
    setProfileWorkers(updatedProfile);
    setOpals((prev) => prev + refundAmount);

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, {
          ownedWorkers: updatedOwned,
          profileWorkers: updatedProfile,
          opals: opals + refundAmount,
        });
      } catch (err) {
        console.error("Failed to fire worker:", err);
      }
    }
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">👷 Hire Workers</h1>

      <ClaimWorkerIncome
        userId={userId}
        profileWorkers={profileWorkers}
        setBalance={setBalance}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...workers].sort((a, b) => a.cost - b.cost).map((worker, index) => {
          const isHired = ownedWorkers.includes(worker.name);
          const isEquipped = profileWorkers.includes(worker.name);
          const canAfford = opals >= worker.cost;
          const refund = Math.floor(worker.cost / 2);

          return (
            <div
              key={index}
              className={`relative p-5 rounded-xl border flex flex-col items-center text-center shadow-xl transition-all overflow-hidden min-h-[380px] ${
                isHired
                  ? "border-green-400"
                  : canAfford
                  ? "border-blue-400"
                  : "border-gray-700 opacity-60"
              }`}
              style={{
                backgroundImage: `url(/workers/${worker.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top 20%",
              }}
            >
              <div className="relative z-1000 mt-auto bg-black bg-opacity-60 rounded-lg px-4 py-3 w-full">
                <h2 className="text-base font-semibold mb-1">{worker.name}</h2>
                <p className="text-xs text-gray-200 mb-2">{worker.description}</p>

                {!isHired && (
                  <p className="text-fuchsia-300 font-bold mb-3">
                    💠 Cost: {worker.cost} Opals
                  </p>
                )}

                {!isHired && canAfford && (
                  <button
                    onClick={() => onHire(worker)}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-transform hover:scale-105"
                  >
                    Hire
                  </button>
                )}

                {isHired && (
                  <>
                    {isEquipped ? (
                      <button
                        onClick={() => handleUnequip(worker.name)}
                        className="px-3 py-1 mt-2 bg-red-600 hover:bg-red-700 rounded text-sm font-bold text-white transition-all"
                      >
                        Unassign
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEquip(worker.name)}
                        className="px-3 py-1 mt-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-white transition-all"
                      >
                        Assign
                      </button>
                    )}

                    <button
                      onClick={() => handleFire(worker.name, refund)}
                      className="px-3 py-1 mt-2 bg-orange-700 hover:bg-orange-800 rounded text-sm font-bold text-white transition-all"
                    >
                      🔥 Fire for {refund} Opals
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
