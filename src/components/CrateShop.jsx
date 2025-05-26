// src/components/CrateShop.jsx
import { useState, useEffect } from "react";
import crates from "../data/crates";
import sets from "../data/sets";

export default function CrateShop({ balance, onOpenCrate, trackedSet }) {
  const [filterRange, setFilterRange] = useState(() => {
    return localStorage.getItem("crateFilterRange") || "all";
  });

  useEffect(() => {
    localStorage.setItem("crateFilterRange", filterRange);
  }, [filterRange]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("crateFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("crateFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredCrates = [...crates]
    .filter(crate => {
      if (filterRange === "all") return true;
      if (filterRange === "favorites") return favorites.includes(crate.name);
      const [min, max] = filterRange.split("-").map(Number);
      return crate.cost >= min && crate.cost <= max;
    })
    .filter(crate => crate.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.cost - b.cost);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
        {[
          { label: "All", value: "all" },
          { label: "Favorites", value: "favorites" },
          { label: "Common", value: "0-999" },
          { label: "Rare", value: "1000-4999" },
          { label: "Epic", value: "5000-29999" },
          { label: "Legendary", value: "30000-499999" },
          { label: "Mythic", value: "500000-1000000" },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              filterRange === value ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setFilterRange(value)}
          >
            {label}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search"
          className="ml-2 px-3 py-1 rounded-full border text-sm bg-black text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Crate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrates.map((crate, index) => {
          const canAfford = balance >= crate.cost;
          const isFavorited = favorites.includes(crate.name);
          const isTracked = trackedSet && crate.items.some(item =>
            sets.find(s => s.name === trackedSet)?.requiredItems?.some(req => req.name === item.name)
          );

          return (
            <div
              key={index}
              className={`relative rounded-xl p-4 border shadow-lg
                bg-gradient-to-br ${crate.style?.gradient || "from-gray-700 to-black"}
                ${crate.style?.extraClasses || ""}
${isTracked ? "ring-4 ring-purple-400 shadow-[0_0_25px_rgba(192,132,252,1)] animate-pulse" : ""}
                ${canAfford ? "hover:scale-105 hover:brightness-110 hover:saturate-150 cursor-pointer transition-all duration-300" : ""}
                group z-0 flex flex-col items-center text-center
              `}
              onClick={(e) => {
                if (e.target.tagName !== "BUTTON" && canAfford) {
                  onOpenCrate(crate);
                }
              }}
            >
              <div className={`${canAfford ? "" : "opacity-50"} w-full flex flex-col items-center`}>
                {/* Favorite Star */}
                <button
                  className={`absolute top-2 right-2 z-20 text-lg ${
                    isFavorited ? "text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavorites(prev =>
                      isFavorited
                        ? prev.filter(name => name !== crate.name)
                        : [...prev, crate.name]
                    );
                  }}
                >
                  {isFavorited ? "★" : "☆"}
                </button>

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
                  <ul className="text-xs max-h-32 overflow-y-auto text-center space-y-1 pr-2 custom-scroll">
                    {[...crate.items].sort((a, b) => a.value - b.value).map((item, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center gap-2 border-b border-white/10 pb-1 last:border-none"
                      >
                        <span className="font-medium text-white truncate">{item.name}</span>
                        <span className="text-xs text-gray-300">${item.value.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
