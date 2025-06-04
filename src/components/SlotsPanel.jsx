import { useNavigate } from "react-router-dom";

const slotMachines = [
  {
    name: "💎 Opal Classic",
    bet: 1,
    emoji: "🎰",
    bg: "from-blue-600 to-indigo-900",
    symbols: ["🍒", "🍋", "🔔", "⭐", "🍇", "🥝", "🍉", "🍌"],
  },
  {
    name: "🔥 High Roller",
    bet: 5,
    emoji: "🔥",
    bg: "from-red-600 to-yellow-600",
    symbols: ["🔥", "💰", "🎲", "🧨", "💎", "💵", "💳", "💣"],
  },
  {
  name: "👑 Triple Crown",
  bet: 10,
  emoji: "👑",
  bg: "from-purple-700 to-pink-600",
  symbols: ["👑", "💍", "👠", "🪞", "👗", "👜", "💄", "💎"],
},
];

export default function SlotsPanel() {
  const navigate = useNavigate();

  return (
<div className="min-h-screen py-16 px-4">
      <h1 className="text-6xl font-extrabold neon-text mb-16 text-center">Slots</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {slotMachines.map((machine, i) => (
          <div
            key={i}
  className={`bg-gradient-to-br ${machine.bg} rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-neon card-hover-zoom cursor-pointer shimmer-effect`}
            onClick={() =>
              navigate("/slots", {
  state: {
    bet: machine.bet,
    name: machine.name,
    symbols: machine.symbols.join(""),
  },
})
            }
          >
            <div className="text-center text-white space-y-4">
              <div className="text-7xl drop-shadow-glow">{machine.emoji}</div>
              <h2 className="text-2xl font-bold drop-shadow-glow">{machine.name}</h2>
              <p className="text-lg text-gray-300 font-semibold">Bet: {machine.bet} 💠</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
