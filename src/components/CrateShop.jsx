import React from "react";
import crates from "../data/crates";

export default function CrateShop({ balance, onOpenCrate }) {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-8">
      {[...crates]
        .sort((a, b) => a.cost - b.cost)
        .map((crate, index) => {
          const canAfford = balance >= crate.cost;

          return (
            <div
              key={index}
              className={`relative rounded-xl p-4 border shadow-lg flex flex-col items-center text-center
                bg-gradient-to-br ${crate.style?.gradient || "from-gray-700 to-black"}
                ${canAfford ? "hover:scale-105 cursor-pointer transition-transform" : "opacity-50"}
                group
              `}
              onClick={() => canAfford && onOpenCrate(crate)}
            >
              <div className="text-5xl mb-2">{crate.emoji}</div>
              <h3 className="text-lg font-bold text-white">{crate.name}</h3>
              <p className="text-sm text-gray-200 mb-2">
                {crate.cost === 0 ? "Free" : `$${crate.cost.toLocaleString()}`}
              </p>
              {crate.items && (
                <p className="text-xs text-gray-300">
                  {crate.items.length} possible items
                </p>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-80 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col items-center justify-center z-10">
                <h4 className="text-md font-bold mb-2">🎁 Prizes</h4>
                <ul className="text-xs max-h-32 overflow-y-auto text-center space-y-1">
                  {crate.items.map((item, i) => (
                    <li key={i}>
                      {item.name} — ${item.value.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
}
