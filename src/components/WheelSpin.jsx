// src/components/WheelSpin.jsx
import { useState, useEffect } from "react";
import wheels from "../data/wheels";

export default function WheelSpin({ balance, onPick, onSpend, isUILocked }) {
const [filterRange, setFilterRange] = useState(() => {
  return localStorage.getItem("wheelFilterRange") || "all";
});

useEffect(() => {
  localStorage.setItem("wheelFilterRange", filterRange);
}, [filterRange]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("wheelFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("wheelFavorites", JSON.stringify(favorites));
  }, [favorites]);

  <input
  type="text"
  placeholder="Search wheels..."
  className="px-3 py-1 rounded-full border text-sm bg-black text-white placeholder-gray-400"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


  const filteredWheels = [...wheels]
  .filter(wheel => {
    if (filterRange === "all") return true;
    if (filterRange === "favorites") return favorites.includes(wheel.name);
    const [min, max] = filterRange.split("-").map(Number);
    return wheel.cost >= min && wheel.cost <= max;
  })
  .filter(wheel => wheel.name.toLowerCase().includes(searchTerm.toLowerCase()))
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


      {/* Wheel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWheels.map((wheel, index) => {
          const canAfford = balance >= wheel.cost;
          const isFavorited = favorites.includes(wheel.name);

          return (
            <div
              key={index}
              className={`relative rounded-xl p-4 border shadow-lg flex flex-col items-center text-center
                bg-gradient-to-br ${wheel.style?.gradient || "from-gray-700 to-black"}
                ${wheel.style?.extraClasses || ""}
                ${canAfford ? "hover:scale-105 hover:brightness-110 hover:saturate-150 cursor-pointer transition-all duration-300" : "opacity-50"}
                group z-0
              `}
              onClick={(e) => {
if (isUILocked) return;
  if (e.target.tagName !== "BUTTON" && canAfford) {
    onSpend?.(wheel.cost);
    onPick?.(wheel);
  }
}}

            >
              {/* Favorite Star */}
              <button
                className={`absolute top-2 right-2 z-20 text-lg ${
                  isFavorited ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFavorites(prev =>
                    isFavorited
                      ? prev.filter(name => name !== wheel.name)
                      : [...prev, wheel.name]
                  );
                }}
              >
                {isFavorited ? "★" : "☆"}
              </button>

              <div className="text-5xl mb-2">{wheel.emoji}</div>
              <h3 className="text-lg font-bold text-white">{wheel.name}</h3>
              <p className="text-sm text-gray-200 mb-2">
                {wheel.cost === 0 ? "Free" : `$${wheel.cost.toLocaleString()}`}
              </p>
              <p className="text-xs text-gray-300">
                {wheel.items.length} possible items
              </p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-80 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col items-center justify-center z-10">
                <h4 className="text-md font-bold mb-2">🎁 Prizes</h4>
                <ul className="text-xs max-h-32 overflow-y-auto text-left space-y-1 pr-2 custom-scroll">
                  {[...wheel.items]
                    .sort((a, b) => a.value - b.value)
                    .map((item, i) => (
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
          );
        })}
      </div>
    </div>
  );
}
