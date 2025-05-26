// src/components/WorkersPanel.jsx
import React from "react";
import workers from "../data/workers";
import ClaimWorkerIncome from "./ClaimWorkerIncome"; // ✅ added

export default function WorkersPanel({
  userId,
  ownedWorkers,
  opals,
  balance,
  setBalance,
  onHire,
}) {
  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">👷 Hire Workers</h1>

      {/* ✅ Daily income component */}
      <ClaimWorkerIncome
        userId={userId}
        ownedWorkers={ownedWorkers}
        setBalance={setBalance}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...workers].sort((a, b) => a.cost - b.cost).map((worker, index) => {
          const isHired = ownedWorkers.includes(worker.name);
          const canAfford = opals >= worker.cost;

          return (
            <div
              key={index}
              className={`relative p-5 rounded-xl border flex flex-col items-center text-center shadow-xl transition-all overflow-hidden min-h-[360px] ${
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
              <div className="relative z-10 mt-auto bg-black bg-opacity-60 rounded-lg px-4 py-3 w-full">
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
                  <p className="text-green-400 text-sm font-medium">Hired ✔</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
