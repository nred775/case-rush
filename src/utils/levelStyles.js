// utils/levelStyles.js
export const getLevelColorClass = (level) => {
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "text-white";
    case 1: return "text-yellow-400";
    case 2: return "text-green-400";
    case 3: return "text-green-700";
    case 4: return "text-cyan-300";
    case 5: return "text-cyan-500";
    case 6: return "text-blue-900 drop-shadow-[0_0_6px_rgba(30,64,175,0.6)]";
    case 7: return "text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.6)]";
    case 8: return "text-purple-500 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]";
    case 9: return "text-yellow-500 drop-shadow-[0_0_5px_rgba(255,255,0,0.8)]";
    case 10: return "text-red-500 drop-shadow-[0_0_6px_rgba(255,80,80,0.8)]";
    default: return "text-red-800 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]";
  }
};
