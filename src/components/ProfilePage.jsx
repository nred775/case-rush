import React, { useState } from "react";
import workers from "../data/workers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import allBadges from "../data/badges";
import pets from "../data/pets";

const getTotalXpForLevel = (level) => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 25 * i * i;
  }
  return total;
};

const getLevelColorClass = (level) => {
  if (level <= 0) return "text-white";
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "text-white";
    case 1: return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]";
    case 2: return "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]";
    case 3: return "text-green-700 drop-shadow-[0_0_8px_rgba(21,128,61,0.9)]";
    case 4: return "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.9)]";
    case 5: return "text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]";
    case 6: return "text-blue-900 drop-shadow-[0_0_10px_rgba(30,64,175,1)]";
    case 7: return "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,1)]";
    case 8: return "text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,1)]";
    case 9: return "text-yellow-500 drop-shadow-[0_0_10px_rgba(255,255,0,1)]";
    case 10: return "text-red-500 drop-shadow-[0_0_10px_rgba(255,80,80,1)]";
    default: return "text-white";
  }
};

export default function ProfilePage({
  currentUser,
  username,
  level,
  xp,
  balance,
  opals,
  equippedAvatar,
  ownedWorkers = [],
  profileWorkers = [],
  setProfileWorkers = () => {},
  readOnly = false,
  badges = [],
  activePet
}) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(profileWorkers);

  const allHiredWorkers = workers.filter((w) => ownedWorkers.includes(w.name));
  const displayedWorkers = workers.filter((w) => profileWorkers.includes(w.name));

  const toggleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : prev.length < 4
        ? [...prev, name]
        : prev
    );
  };

  const xpForCurrent = getTotalXpForLevel(level);
  const xpForNext = getTotalXpForLevel(level + 1);
  const xpProgress = Math.max(0, xp - xpForCurrent);
  const xpNeeded = xpForNext - xpForCurrent;
  const progressPercent = Math.min(100, Math.floor((xpProgress / xpNeeded) * 100));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.12)] border border-white/20 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#3b0764] flex flex-col items-center text-white gap-6 py-6">

        {/* Top Info */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-black/70 px-4 py-2 rounded-xl flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <span className="text-4xl">🎮</span>
              <span className={`text-xl sm:text-2xl font-bold ${getLevelColorClass(level)}`}>
                [{level}]
              </span>
              <span className={`text-2xl sm:text-3xl font-extrabold ${getLevelColorClass(level)}`}>
                {username}'s Profile
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="w-full max-w-sm mx-auto">
            <div className="w-full h-4 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-lime-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-center text-gray-300">
              {isNaN(xpProgress) || isNaN(xpNeeded) || level <= 0
                ? `0 / 25 XP to level 2`
                : level >= 120
                ? `${(xp - getTotalXpForLevel(120)).toLocaleString()} XP over level 120`
                : `${xpProgress.toLocaleString()} / ${xpNeeded.toLocaleString()} XP to level ${level + 1}`}
            </p>
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {allBadges
              .filter((b) => badges.includes(b.id))
              .map((badge) => (
                <div key={badge.id} className="relative group">
                  <div className="bg-black/60 border border-white/20 rounded-full px-3 py-1 text-sm flex items-center gap-1 shadow-md cursor-default">
                    <span>{badge.icon}</span>
                    <span className="text-white font-medium">{badge.name}</span>
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                    {badge.description}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Avatar + Assigned Pet Display */}
        <div className="relative w-full max-w-md flex justify-center items-center">
          {equippedAvatar ? (
            <img
              src={`/avatars/${equippedAvatar.toLowerCase().replace(/\s+/g, "_")}.png`}
              alt="Player Avatar"
              className="w-full max-w-md object-contain"
            />
          ) : (
            <div className="w-full max-w-md h-60 flex items-center justify-center text-7xl text-white bg-gray-800 rounded-2xl">
              👤
            </div>
          )}

          {/* Pet Placement */}
          {activePet && (() => {
            const pet = pets.find(p => p.name === activePet);
            const position = pet?.position || "bottom-left";
            const positionClasses = {
              "top-left": "top-0 left-4",
              "top-right": "top-0 right-4",
              "bottom-left": "bottom-0 left-4",
              "bottom-right": "bottom-0 right-4",
            };
            return (
              <img
                src={`/pets/${activePet.toLowerCase().replace(/\s+/g, "_")}.png`}
                alt={activePet}
                className={`absolute w-36 h-36 object-contain drop-shadow-[0_0_20px_rgba(255,192,203,0.8)] z-20 ${positionClasses[position]}`}
              />
            );
          })()}
        </div>

        {/* Worker Squad */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
          {Array.from({ length: 4 }).map((_, index) => {
            const worker = displayedWorkers[index];
            return worker ? (
              <div
  key={index}
  className="relative bg-gradient-to-br from-cyan-900 via-indigo-800 to-purple-900 p-2 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.3)] border border-cyan-400/40 hover:scale-105 transition-transform duration-300"
>
  <img
    src={`/workers/${worker.image}`}
    alt={worker.name}
    className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
  />
</div>

            ) : (
              <div key={index} className="bg-black/40 p-3 rounded-2xl flex flex-col items-center border-2 border-dashed border-cyan-300/30">
                <div className="w-28 h-28 flex items-center justify-center text-6xl text-cyan-200/50">👤</div>
                <p className="text-sm mt-2 font-medium text-cyan-200/30 text-center">Empty</p>
              </div>
            );
          })}
        </div>

        {/* Balance + Opals */}
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-2 border-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]">
            <span className="text-xl">💰</span>
            <span className="font-mono text-green-300 text-xl font-extrabold">${Number(balance).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 border-2 border-purple-300 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.9)]">
            💠
            <span className="font-mono text-white text-xl font-bold">{Number(opals).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
