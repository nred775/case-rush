import React, { useState } from "react";

const levelXpRequired = (lvl) => 25 * lvl * lvl;

const getTotalXpForLevel = (level) => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += levelXpRequired(i);
  }
  return total;
};

export default function LevelsPanel({
  level,
  xp,
  opals,
  setOpals,
  claimedRewards,
  setClaimedRewards,
  saveUserData,
  balance,
  inventory,
  ownedAvatars,
  setOwnedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  userBadges,
  setUserBadges,
  setToastMessage,
}) {
  const xpForCurrent = getTotalXpForLevel(level);
  const xpForNext = getTotalXpForLevel(level + 1);
  const xpProgress = Math.max(0, xp - xpForCurrent);
  const xpNeeded = xpForNext - xpForCurrent;
  const progressPercent = Math.min(100, Math.floor((xpProgress / xpNeeded) * 100));

  const MAX_LEVEL = 120;
  const rewardLevels = Array.from({ length: MAX_LEVEL / 10 }, (_, i) => (i + 1) * 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLevel = rewardLevels[currentIndex];
  const currentAmount = 50;

  return (
    <div className="relative max-w-4xl mx-auto mt-12 px-6">
      {/* Title above the box */}
      <h1 className="text-4xl font-bold text-center mb-6 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
        ⚡ Level Up Journey
      </h1>

      {/* Main panel container */}
      <div className="relative px-6 py-12 bg-gradient-to-br from-[#0a0f1a] to-[#0d2239] text-white rounded-3xl shadow-[0_0_30px_rgba(56,189,248,0.4)] border border-white/10 overflow-visible backdrop-blur-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-400/10 blur-2xl z-0 rounded-3xl" />
        <div className="relative z-10">
          {/* XP CORE */}
          <div className="mb-12 bg-gradient-to-br from-gray-900/40 to-black/20 rounded-2xl p-6 border border-white/10 shadow-inner shadow-black backdrop-blur">
            <p className="text-center text-3xl font-bold text-cyan-300 mb-4">Current Level: {level}</p>
            <div className="relative w-full h-6 rounded-full overflow-hidden bg-gray-800 border border-cyan-500/30 shadow-lg">
              <div
                className="absolute h-full bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-300 mt-3">
              {level >= 120
                ? `${xp - getTotalXpForLevel(120)} XP over max level`
                : `${xpProgress} / ${xpNeeded} XP to level ${level + 1}`}
            </p>
          </div>

          {/* LEVEL TIMELINE */}
          <div className="rounded-2xl p-6 bg-white/5 border border-cyan-400/30 shadow-lg backdrop-blur-md">
            <h2 className="text-center text-3xl font-bold text-cyan-300 mb-6">Rewards</h2>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
                className="text-4xl text-white hover:text-cyan-300 disabled:opacity-30 transition"
              >
                ◀
              </button>

              <div className="text-center space-y-3">
                <p className="text-cyan-300 text-2xl font-bold">Level {currentLevel}</p>
                <p className="text-xl">
                  {currentLevel === 60
                    ? level >= 60
                      ? "🧍 Velocity Viper"
                      : "🧍 Mysterious Avatar"
                    : currentLevel === 120
                    ? level >= 120
                      ? "🐷 Boss Hog + ♾️ Ascended Badge"
                      : "🧍 Mysterious Avatar + Secret Badge"
                    : `💠 ${currentAmount} Opals`}
                </p>

                {level >= currentLevel ? (
  claimedRewards.includes(currentLevel) ? (
    <p className="text-green-400 font-bold">✅ Claimed</p>
  ) : (
    <button
      onClick={() => {
        const updated = [...claimedRewards, currentLevel];
        if (currentLevel === 60) {
          const newAvatars = [...ownedAvatars, "Velocity Viper"];
          setOwnedAvatars(newAvatars);
          setClaimedRewards(updated);
          saveUserData(balance, inventory, opals, newAvatars, equippedAvatar, ownedWorkers, completedSets, xp, level, updated);
        } else if (currentLevel === 120) {
          const newAvatars = [...ownedAvatars, "Boss Hog"];
          const newBadges = [...userBadges, "max"];
          setOwnedAvatars(newAvatars);
          setClaimedRewards(updated);
          setUserBadges(newBadges);
          setToastMessage("🌟 Max Level Badge Earned!");
          saveUserData(
            balance,
            inventory,
            opals,
            newAvatars,
            equippedAvatar,
            ownedWorkers,
            completedSets,
            xp,
            level,
            updated,
            newBadges
          );
        } else {
          const newOpals = opals + currentAmount;
          setOpals(newOpals);
          setClaimedRewards(updated);
          saveUserData(balance, inventory, newOpals, ownedAvatars, equippedAvatar, ownedWorkers, completedSets, xp, level, updated);
        }
      }}
      className="px-6 py-2 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-white font-bold rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
    >
      🎁 Claim Reward
    </button>
  )
) : null}

              </div>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, rewardLevels.length - 1))}
                disabled={currentIndex === rewardLevels.length - 1}
                className="text-4xl text-white hover:text-cyan-300 disabled:opacity-30 transition"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
