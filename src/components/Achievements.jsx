import React from "react";
import { useEffect } from "react";



export default function Achievements({
  stats,
  opals,
  setOpals,
  claimedAchievements,
  setClaimedAchievements,
  saveUserData,
  balance,
  inventory,
  ownedAvatars,
  setOwnedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  xp,
  level,
  claimedRewards,
  userBadges,
  topBarButtons,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  blackjackWins,
  setNotifications, // ✅ <-- ADD THIS LINE
}) {

  const milestoneGoals = (key, milestones, rewards = []) => {
    const progress = stats[key] || 0;
    const claimedSet = new Set(claimedAchievements);
    const nameMap = {
      wheelsSpun: "Wheels Spun",
      casesOpened: "Cases Opened",
      dailyGrids: "Daily Grids Completed",
      blackjackWins: "Blackjack 21s",
      workersOwned: "Workers Bought",
      avatarsOwned: "Avatars Bought",
      setsCompleted: "Sets Completed",
        slotsSpun: "Slots Spun",
  horseRaces: "Horse Races",

    };

    const result = [];

    for (let i = 0; i < milestones.length; i++) {
      const target = milestones[i];
      const tierKey = `${key}_${target}`;
      const prevKey = i === 0 ? null : `${key}_${milestones[i - 1]}`;
      const prevClaimed = i === 0 || claimedSet.has(prevKey);

      if (!claimedSet.has(tierKey) && prevClaimed) {
        let reward = rewards[i] ?? 5 * (i + 1);
        let isAvatar = false;
        if (typeof reward === "object" && reward.avatar) {
          reward = reward.avatar;
          isAvatar = true;
        }

        result.push({
          label: nameMap[key] || key,
          key: tierKey,
          target,
          reward,
          isAvatar,
        });
        break;
      }
    }

    return result;
  };

  const rawGoals = [
    ...milestoneGoals("wheelsSpun", [10, 100, 10000, 1000000], [5, 10, 50, { avatar: "Wheel Master" }]),
    ...milestoneGoals("casesOpened", [10, 100, 10000, 1000000], [5, 10, 50, { avatar: "Case Crusher" }]),
    ...milestoneGoals("dailyGrids", [1, 5, 10, 50, 100], [2, 5, 10, 25, 50]),
    ...milestoneGoals("blackjackWins", [1, 10, 100], [5, 15, { avatar: "Blackjack Boss" }]),
    ...milestoneGoals("workersOwned", [1, 5, 10], [10, 25, 50]),
    ...milestoneGoals("avatarsOwned", [1, 5], [25, 100]),
    ...milestoneGoals("setsCompleted", [1, 5, 10, 25], [10, 50, 100, 250]),
     ...milestoneGoals("slotsSpun", [10, 25, 50, 100], [5, 10, 25, 50]),
  ...milestoneGoals("horseRaces", [10, 100, 10000, 1000000], [5, 10, 50, { avatar: "Racing Legend" }]),
  ];

  const sortedGoals = rawGoals.sort((a, b) => {
  const aBase = a.key.split("_")[0];
  const bBase = b.key.split("_")[0];
  const aProgress = stats[aBase] || 0;
  const bProgress = stats[bBase] || 0;

  const aCompleted = aProgress >= a.target && !claimedAchievements.includes(a.key);
  const bCompleted = bProgress >= b.target && !claimedAchievements.includes(b.key);

  // ✅ Put unclaimed completed first
  if (aCompleted && !bCompleted) return -1;
  if (bCompleted && !aCompleted) return 1;

  // 🪙 Then sort by numeric reward (avatars treated as highest)
  const rewardValue = (r) => typeof r.reward === "number" ? r.reward : 9999;
  return rewardValue(a) - rewardValue(b);
});


  const unclaimedGoals = sortedGoals.filter(({ key, target }) => {
    const base = key.split("_")[0];
    const progress = stats[base] || 0;
    return !(progress >= target && claimedAchievements.includes(key));
  });

  const finalTiers = [
  { key: "wheelsSpun", target: 1000000 },
  { key: "casesOpened", target: 1000000 },
  { key: "dailyGrids", target: 100 },
  { key: "blackjackWins", target: 100 },
  { key: "workersOwned", target: 10 },
  { key: "avatarsOwned", target: 5 },
  { key: "setsCompleted", target: 25 },
  { key: "slotsSpun", target: 100 }, // 🔧 was 25
  { key: "horseRaces", target: 1000000 },
];


const claimedGoals = finalTiers
  .map(({ key, target }) => {
    const progress = stats[key] || 0;
    const tierKey = `${key}_${target}`;
    if (progress >= target && claimedAchievements.includes(tierKey)) {
      const reward = (() => {
        switch (key) {
          case "wheelsSpun": return "Wheel Master";
          case "casesOpened": return "Case Crusher";
          case "blackjackWins": return "Blackjack Boss";
          case "horseRaces": return "Racing Legend";

          default: return null;
        }
      })();
      const isAvatar = !!reward;

      return {
        label: {
          wheelsSpun: "Wheels Spun",
          casesOpened: "Cases Opened",
          dailyGrids: "Daily Grids Completed",
          blackjackWins: "Blackjack 21s",
          workersOwned: "Workers Bought",
          avatarsOwned: "Avatars Bought",
          setsCompleted: "Sets Completed",
        }[key],
        key: tierKey,
        target,
        reward: reward || "✅",
        isAvatar,
      };
    }
    return null;
  })
  .filter(Boolean);


  const handleClaim = (key, reward, isAvatar = false) => {
  const updatedClaims = [...claimedAchievements, key];
  let newOpals = opals;
  let newAvatars = [...ownedAvatars];

  if (isAvatar) {
    if (!newAvatars.includes(reward)) {
      newAvatars.push(reward);
    }
  } else {
    newOpals += reward;
  }

  // 🧼 No claim-time notification here
  setOpals(newOpals);
  setClaimedAchievements(updatedClaims);
  setOwnedAvatars(newAvatars);

  saveUserData(
    balance,
    inventory,
    newOpals,
    newAvatars,
    equippedAvatar,
    ownedWorkers,
    completedSets,
    xp,
    level,
    claimedRewards,
    userBadges,
    topBarButtons,
    updatedClaims,
    wheelsSpun,
    casesOpened,
    dailyGrids,
    blackjackWins
  );
};



  const renderGoal = ({ label, key, target, reward, isAvatar }, idx) => {
    const base = key.split("_")[0];
    const progress = stats[base] || 0;
    const completed = progress >= target;
    const alreadyClaimed = claimedAchievements.includes(key);

    return (
      <li
        key={key}
        className="p-4 rounded-2xl border shadow-md transition-all duration-300 card-hover-zoom animate-fade-up"
        style={{
          animationDelay: `${idx * 100}ms`,
          animationFillMode: "both",
          backgroundImage: completed
            ? "linear-gradient(to bottom right, #064e3b, #065f46)"
            : "linear-gradient(to bottom right, #1f2937, #111827)",
          borderColor: completed ? "#34d399" : "#4b5563",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg">{label}</span>
          <span className="text-sm text-gray-300">
            {Math.min(progress, target)} / {target}
          </span>
        </div>

        {completed ? (
          alreadyClaimed ? (
            <p className="text-green-300 text-sm mt-2 animate-fade-in-fast border border-green-500 rounded-full px-3 py-1 bg-black/30 shadow-inner text-center">
              ✅ Claimed
            </p>
          ) : (
            <button
              onClick={() => handleClaim(key, reward, isAvatar)}
              className="mt-3 glow-btn glow-core px-6 py-2 text-sm rounded-full font-bold tracking-wide animate-fade-in-fast w-full"
            >
              {isAvatar ? `🧍 Unlock ${reward}` : `💠 Claim ${reward} Opals`}
            </button>
          )
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 relative border border-gray-600 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm opacity-70">
                {isAvatar ? `🧍 ${reward}` : `💠 ${reward} Opals`}
              </span>
              <div className="text-gray-400 opacity-60 text-lg animate-pulse">🔒</div>
            </div>
            <div className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-gray-800 border border-gray-600 rounded-full text-gray-400 shimmer-soft">
              Incomplete
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="bg-neon-pattern min-h-screen py-10 px-4">
      <div className="p-6 text-white max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-yellow-300 drop-shadow-glow animate-fade-up">
          <span className="invisible">Cha</span> 🏆 Achievements <span className="invisible">Cha</span>
        </h2>

        <ul className="space-y-6">
          {unclaimedGoals.map(renderGoal)}
        </ul>

        {claimedGoals.length > 0 && (
          <>
            <h3 className="text-xl mt-10 mb-4 text-green-300 font-bold tracking-wide border-b border-green-600 pb-1">
              ✅ Completed Achievements
            </h3>
            <ul className="space-y-6">
              {claimedGoals.map(renderGoal)}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
