// src/components/WheelOpening.jsx
import { useEffect, useRef, useState } from "react";
import useCrateSounds from "./useCrateSounds";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";
import sets from "../data/sets";



const bigWinAudio = new Audio("/sounds/rare-sparkle.mp3");
const tickAudio = new Audio("/sounds/tick.mp3");

export default function WheelOpening({ wheel, onSell, onAdd, onSpend, onBack, tickVolume, caseVolume, isMuted, overallVolume, trackedSet }) {


  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const { playTick } = useCrateSounds(tickVolume, isMuted, overallVolume);
const { playLidOpen, playBigPrize } = useCrateSounds(caseVolume, isMuted, overallVolume);

  const tickIntervalRef = useRef(null);
  const tickTimeoutRef = useRef(null); // up top with other refs

const isMobile = width < 640;
const WHEEL_SIZE = isMobile ? Math.min(width * 0.9, 360) : 600;


  const getSegmentColor = (value) => {
    const ratio = value / wheel.cost;
    const topValue = Math.max(...wheel.items.map((item) => item.value));
    if (value === topValue) return "#ffd966";
    if (ratio <= 0.5) return "#374151";
    if (ratio <= 1.0) return "#3b82f6";
    return "#9333ea";
  };

const isTrackedItem = (itemName) => {
  if (!trackedSet) return false;
  const set = sets.find(s => s.name === trackedSet);
  return set?.requiredItems?.some(req => req.name === itemName);
};


  const spin = () => {
  if (!wheel || spinning) return;

  const count = wheel.items.length;
  const segmentAngle = 360 / count;
  const spins = Math.floor(Math.random() * 6) + 10;
  const spinAmount = spins * 360 + Math.random() * 360;

  setSpinning(true);
  setResultIndex(null);

  // 🎵 Ticking that slows down
  let tickCount = 0;
  let tickDelay = 50;

  const startTickLoop = () => {
    if (tickCount >= 16) return;
  
    playTick(); // ✅ this is now from useCrateSounds
    tickCount++;
    tickDelay *= 1.15;
    tickTimeoutRef.current = setTimeout(startTickLoop, tickDelay);
  };
  

  startTickLoop(); // instead of playTick();


  // 🔁 Begin spin
  const newRotation = rotation + spinAmount;
  setRotation(newRotation);

  // 🎯 Handle result at end
  setTimeout(() => {
    clearTimeout(tickTimeoutRef.current);

    const absoluteRotation = newRotation % 360;
    const pointerAngle = 0;
    const wheelAngle = (360 - (absoluteRotation - pointerAngle) + 360) % 360;
    const landedIndex = Math.floor(wheelAngle / segmentAngle) % count;

    setResultIndex(landedIndex);
    const landedItem = wheel.items[landedIndex];
    const topValue = Math.max(...wheel.items.map((i) => i.value));
    if (landedItem.value === topValue) {
      playBigPrize();
    } else {
      playLidOpen();
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setSpinning(false);
  }, 4500);
};



  const result = resultIndex !== null ? wheel.items[resultIndex] : null;
  const topPrizeValue = Math.max(...wheel.items.map((i) => i.value));

  return (
<div className="fixed inset-0 z-50 bg-black/70 text-white flex flex-col items-center justify-center p-6">
{showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={200} gravity={0.4} />
        </div>
      )}

      {result?.value === topPrizeValue && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-300 animate-pulse drop-shadow-lg">
            🎊 JACKPOT! 🎊
          </h1>
        </div>
      )}

      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">
 {wheel.emoji} {wheel.name}</h2>

      <div className="relative mb-4" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
        <div
  className="absolute top-0 left-0 w-full flex justify-center z-30 pointer-events-none"
style={{ transform: "translateX(-2.2px)" }}
>

  <div
    className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[36px]
      border-l-transparent border-r-transparent border-t-pink-500 
      animate-pulse-slow"
    style={{
      borderTopColor: "#ec4899",
      filter: "drop-shadow(0 0 5px #ec4899) drop-shadow(0 3px 6px #ec4899)",
    }}
  />
</div>


        <motion.div
  className="rounded-full overflow-hidden border-[6px] border-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_40px_rgba(75,85,99,0.7)]"
  style={{
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    background: "radial-gradient(circle at center, #111827, #000000)",
    willChange: "transform", // ✅ optimization hint
  }}
  animate={{ rotate: rotation }}
  transition={{ duration: 4.5, ease: [0.1, 1, 0.2, 1] }}
>


          <svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
            <g transform={`translate(${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2}) rotate(-90)`}>
              {wheel.items.map((item, i) => {
                const angle = 360 / wheel.items.length;
                const startAngle = i * angle;
                const endAngle = startAngle + angle;
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                const radius = WHEEL_SIZE / 2;

                const x1 = radius * Math.cos((Math.PI / 180) * startAngle);
                const y1 = radius * Math.sin((Math.PI / 180) * startAngle);
                const x2 = radius * Math.cos((Math.PI / 180) * endAngle);
                const y2 = radius * Math.sin((Math.PI / 180) * endAngle);

                const pathData = `
                  M 0 0
                  L ${x1} ${y1}
                  A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                  Z
                `;

                const midAngle = (startAngle + endAngle) / 2;
                const textX = radius * 0.6 * Math.cos((Math.PI / 180) * midAngle);
                const textY = radius * 0.6 * Math.sin((Math.PI / 180) * midAngle);

                return (
                  <motion.g
  key={i}
  animate={!spinning && resultIndex === i ? { scale: 1.12 } : { scale: 1 }}
  transition={{ duration: 0.4 }}
>

                    <path
  d={pathData}
  fill={getSegmentColor(item.value)}
  stroke={isTrackedItem(item.name) ? "#000000" : "#ffffff"}
  strokeWidth="0.75"
  style={{
  filter:
    item.value === topPrizeValue ? "drop-shadow(0 0 6px #fff8dc)" : "none",
}}

/>


                    <text
  x={textX}
  y={textY}
  textAnchor="middle"
  alignmentBaseline="middle"
  fill={isTrackedItem(item.name) ? "#c084fc" : (resultIndex === i ? "#111827" : "#1f2937")}
  className={isTrackedItem(item.name) ? "animate-pulse" : ""}
  fontSize={resultIndex === i ? "17" : "16"}
  stroke={isTrackedItem(item.name) ? "#000000" : "white"}  // 🔁 right here
  strokeWidth="0.75"
  paintOrder="stroke"
  style={{
    fontWeight: resultIndex === i ? "800" : "bold",
    transition: "all 0.3s ease",
  }}
  transform={`rotate(${midAngle}, ${textX}, ${textY})`}
>
  {item.name}
</text>



                  </motion.g>
                );
              })}
            </g>
          </svg>
        </motion.div>
      </div>

      {!spinning && resultIndex === null && (
  <button
    onClick={spin}
    className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-24 h-24 sm:w-28 sm:h-28 rounded-full 
               bg-gradient-to-tr from-indigo-600 to-purple-700 
               hover:brightness-110 
               text-gray-900 font-extrabold text-xl sm:text-2xl 
               border-4 border-gray-900 
               shadow-[0_0_16px_rgba(139,92,246,0.6),0_0_30px_rgba(139,92,246,0.4)] 
               transition-all duration-300"
  >
    SPIN
  </button>
)}



      {result && (
<div className="mt-4 sm:mt-6 text-center px-4 animate-pulse">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">🎉 You got: {result.name}</h2>
<div className="w-full max-w-md flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-4 mb-2 px-4">
          <button
              onClick={() => onSell?.(result.value)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-lg"
            >
              Sell for ${result.value.toLocaleString()}
            </button>
            <button
              onClick={() =>
                onAdd?.({
                  case: wheel.name,
                  item: result.name,
                  value: result.value,
                })
              }
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded text-lg"
            >
              Add to Inventory
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
