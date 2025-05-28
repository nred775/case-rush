// src/components/CrateShop.jsx
import { useState, useEffect } from "react";
import crates from "../data/crates";
import sets from "../data/sets";

export default function CrateShop({ balance, onOpenCrate, trackedSet }) {
  const [filterRange, setFilterRange] = useState(() => {
    return localStorage.getItem("crateFilterRange") || "all";
  });

  const [compactView, setCompactView] = useState(() => {
  return localStorage.getItem("compactView") === "true";
});

useEffect(() => {
  localStorage.setItem("compactView", compactView);
}, [compactView]);


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

      <div className="ml-2 flex items-center space-x-1">
  <button
    onClick={() => setCompactView(false)}
    className={`p-1 rounded hover:scale-110 transition ${
      !compactView ? "bg-white text-black" : "text-white"
    }`}
    title="Normal Grid View"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  </button>
  <button
    onClick={() => setCompactView(true)}
    className={`p-1 rounded hover:scale-110 transition ${
      compactView ? "bg-white text-black" : "text-white"
    }`}
    title="Compact Grid View"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="2" y="2" width="4" height="4" />
      <rect x="9" y="2" width="4" height="4" />
      <rect x="16" y="2" width="4" height="4" />
      <rect x="2" y="9" width="4" height="4" />
      <rect x="9" y="9" width="4" height="4" />
      <rect x="16" y="9" width="4" height="4" />
      <rect x="2" y="16" width="4" height="4" />
      <rect x="9" y="16" width="4" height="4" />
      <rect x="16" y="16" width="4" height="4" />
    </svg>
  </button>
</div>



      {/* Crate Grid */}
<div className={`grid ${compactView ? "gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5" : "gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {filteredCrates.map((crate, index) => {
          const canAfford = balance >= crate.cost;
          const isFavorited = favorites.includes(crate.name);
          const isTracked = trackedSet && crate.items.some(item =>
            sets.find(s => s.name === trackedSet)?.requiredItems?.some(req => req.name === item.name)
          );

          return (
            <div
  key={index}
  className={`relative overflow-hidden rounded-xl ${compactView ? "p-2 text-xs" : "p-4"} border shadow-lg
    bg-gradient-to-br ${crate.style?.gradient || "from-gray-700 to-black"}
    ${crate.style?.extraClasses || ""}
    ${isTracked ? "ring-4 ring-purple-400 shadow-[0_0_25px_rgba(192,132,252,1)] animate-pulse" : ""}
    ${canAfford ? "hover:scale-105 hover:brightness-110 hover:saturate-150 cursor-pointer transition-all duration-300" : ""}
    group z-0 flex flex-col items-center text-center
    ${compactView ? "scale-90 text-sm" : ""}
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
<div className={`absolute inset-0 bg-black bg-opacity-80 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${compactView ? "p-2" : "p-4"} flex flex-col items-center justify-center z-10`}>
                  <h4 className="text-md font-bold mb-2">🎁 Prizes</h4>
                  <ul className="text-xs max-h-32 overflow-y-auto text-center space-y-1 pr-2 custom-scroll">
                    {[...crate.items].sort((a, b) => a.value - b.value).map((item, i) => (
                      <li
                        key={i}
  className={`flex justify-between items-center gap-1 border-b border-white/10 ${compactView ? "pb-0.5" : "pb-1"} last:border-none`}
                      >
<span
  className={`font-medium text-white leading-tight ${
    compactView ? "text-[10px] max-w-[6rem]" : "text-xs max-w-[8rem]"
  } truncate whitespace-nowrap`}
  title={item.name}
>
  {item.name}
</span>
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
