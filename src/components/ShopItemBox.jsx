import React from "react";

export default function ShopItemBox({ emoji, name, cost, items, gradient, onClick, isSelected, canAfford }) {
  return (
    <div
      className={`w-full h-[230px] relative rounded-xl p-6 border shadow-lg flex flex-col items-center text-center
        bg-gradient-to-br ${gradient || "from-gray-700 to-black"}
        ${canAfford ? "hover:scale-105 cursor-pointer transition-transform" : "opacity-50"}
        ${isSelected ? "ring-4 ring-yellow-300 shadow-yellow-500/40 shadow-md" : ""}
        group
      `}
      onClick={canAfford ? onClick : undefined}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-sm font-semibold text-white">
        {cost === 0 ? "Free" : `$${cost}`}
      </p>
      <p className="text-xs text-gray-300">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="absolute inset-0 bg-black bg-opacity-80 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col items-center justify-center z-10">
        <h4 className="text-md font-bold mb-2">🎁 Prizes</h4>
        <ul className="text-xs max-h-32 overflow-y-auto text-center space-y-0.5">
          {items.map((item, i) => (
            <li key={i}>
              {item.name} — ${item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
