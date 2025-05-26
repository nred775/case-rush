import React, { useState } from "react";
import sets from "../data/sets";
import badges from "../data/badges";


const normalize = (str) => str?.toLowerCase().replace(/\s/g, "").trim();

const rarityValue = (rarity) => {
  switch (rarity) {
    case "common": return 1;
    case "rare": return 2;
    case "epic": return 3;
    case "legendary": return 4;
    case "mythic": return 5;
    default: return 0;
  }
};

const getRarityColor = (rarity, owned = false) => {
  const baseColors = {
    common: { color: "gray", shadow: "shadow-[0_0_10px_rgba(156,163,175,0.8)]" },
    rare: { color: "orange", shadow: "shadow-[0_0_10px_rgba(251,146,60,0.8)]" },
    epic: { color: "purple", shadow: "shadow-[0_0_10px_rgba(192,132,252,0.8)]" },
    legendary: { color: "yellow", shadow: "shadow-[0_0_10px_rgba(253,224,71,0.8)]" },
    mythic: { color: "fuchsia", shadow: "shadow-[0_0_14px_rgba(232,121,249,0.9)] animate-pulse" }
  };

  const fallback = { color: "white", shadow: "" };
  const { color, shadow } = baseColors[rarity] || fallback;

  const bg = owned ? `bg-${color}-500` : "bg-transparent";
  const text = owned ? "text-black" : `text-${color}-400`;
  const border = `border-${color}-400`;

  return `${bg} ${text} ${border} ${owned ? shadow : ""}`;
};
const getBadgeDisplayName = (id) => {
  const found = badges.find((b) => b.id === id);
  return found ? `${found.icon || "🏅"} ${found.name}` : id;
};


export default function SetsPanel({ inventory, onTurnInSet, completedSets = [], trackedSet, setTrackedSet }) {
  const [activeTab, setActiveTab] = useState("notCompleted");

  const hasItems = (required) => {
    return required.every((reqItem) =>
      inventory.some((invItem) => normalize(invItem.item) === normalize(reqItem.name))
    );
  };

  const alreadyCompleted = (setName) => completedSets.includes(setName);

  const hasEnoughRarity = (rarity, count) => {
    return inventory.filter((item) => item.rarity === rarity).length >= count;
  };

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("notCompleted")}
          className={`px-4 py-2 rounded-lg font-bold ${
            activeTab === "notCompleted"
              ? "bg-fuchsia-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          📋 Remaining
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-lg font-bold ${
            activeTab === "completed"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          ✅ Completed
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">🎁 Sets </h1>

      <div className={`grid gap-6 ${activeTab === "completed" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {[...sets]
.sort((a, b) => {
  const aVal = a.badge ? 999999 : a.reward;
  const bVal = b.badge ? 999999 : b.reward;
  return aVal - bVal;
})
          .filter((set) => {
            const isComplete = completedSets.includes(set.name);
            return activeTab === "completed" ? isComplete : !isComplete;
          })
          .map((set, index) => {
            const isComplete = completedSets.includes(set.name);
            const canTurnIn = !isComplete && (
              set.requiredItems
                ? hasItems(set.requiredItems)
                : hasEnoughRarity(set.requiredRarity, set.count)
            );

            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border shadow-md transform transition-all hover:scale-[1.02] ${
                  canTurnIn
                    ? "border-green-400 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
                    : "border-gray-700 bg-gray-900 opacity-60"
                }`}
              >
<div className="flex items-center justify-between mb-2">
  <h2 className="text-2xl font-bold text-white">{set.name}</h2>
  <button
    onClick={() => setTrackedSet(trackedSet === set.name ? null : set.name)}
    className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border ${
      trackedSet === set.name
        ? "bg-purple-700 border-purple-400 text-white animate-pulse"
        : "bg-gray-800 border-gray-500 text-gray-300"
    }`}
  >
    {trackedSet === set.name ? "Tracking" : "Track"}
  </button>
</div>
<div className="text-sm text-gray-300 mb-2">
  {set.requiredItems ? (
    <div className="flex flex-wrap gap-2">
      {[...set.requiredItems]
        .sort((a, b) => rarityValue(a.rarity) - rarityValue(b.rarity))
        .map((item, idx) => {
          const ownsItem = inventory.some(
            (invItem) => normalize(invItem.item) === normalize(item.name)
          );

          return (
            <span
              key={idx}
              className={`relative group px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(item.rarity, ownsItem)}`}
            >
              {item.name}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max max-w-xs bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                {item.source || "Unknown source"}
              </span>
            </span>
          );
        })}
    </div>
  ) : (
    <span className="inline-block bg-blue-800/20 border border-blue-400 px-2 py-1 rounded-full text-xs font-medium text-blue-300">
      Turn in {set.count}{" "}
      <span className="capitalize">{set.requiredRarity}</span> items
    </span>
  )}
</div>


                <p className="mt-2 text-pink-400 font-bold text-sm flex items-center gap-1">
  {set.badge
    ? `🏅 Reward: ${getBadgeDisplayName(set.badge)} Badge`
    : `💠 Reward: ${set.reward} Opal${set.reward > 1 ? "s" : ""}`}
</p>





                {isComplete ? (
                  <p className="mt-4 px-4 py-2 rounded-lg bg-gray-700 text-white text-center font-semibold shadow-sm">
                    ✅ Completed
                  </p>
                ) : (
                  canTurnIn && (
                    <button
                      onClick={() => onTurnInSet(set)}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-150 rounded-lg text-white font-semibold shadow-sm"
                    >
                      Trade In
                    </button>
                  )
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
