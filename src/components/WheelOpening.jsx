// src/components/WheelOpening.jsx
import { useEffect, useRef, useState } from "react";
import useCrateSounds from "./useCrateSounds";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

const WHEEL_SIZE = 600;
const bigWinAudio = new Audio("/sounds/rare-sparkle.mp3");

export default function WheelOpening({ wheel, onSell, onAdd, onSpend }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const { playLidOpen } = useCrateSounds();

  const getSegmentColor = (value) => {
    const ratio = value / wheel.cost;
    const topValue = Math.max(...wheel.items.map((item) => item.value));

    if (value === topValue) return "#facc15"; // gold
    if (ratio <= 0.5) return "#374151";       // gray
    if (ratio <= 1.0) return "#3b82f6";       // blue
    return "#9333ea";                         // purple
  };

  const spin = () => {
    if (!wheel || spinning) return;

    const count = wheel.items.length;
    const segmentAngle = 360 / count;
    const spins = Math.floor(Math.random() * 6) + 10;
    const spinAmount = spins * 360 + Math.random() * 360;

    setSpinning(true);
    setResultIndex(null);
    setRotation((prev) => {
      const newRotation = prev + spinAmount;

      setTimeout(() => {
        const absoluteRotation = newRotation % 360;
        const pointerAngle = 0;
        const wheelAngle = (360 - (absoluteRotation - pointerAngle) + 360) % 360;
        const landedIndex = Math.floor(wheelAngle / segmentAngle) % count;

        setResultIndex(landedIndex);
        const landedItem = wheel.items[landedIndex];
        const topValue = Math.max(...wheel.items.map((i) => i.value));
        if (landedItem.value === topValue) {
          bigWinAudio.volume = 1;
          bigWinAudio.play();
        } else {
          playLidOpen();
        }

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        setSpinning(false);
      }, 4500);

      return newRotation;
    });
  };

  const result = resultIndex !== null ? wheel.items[resultIndex] : null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-8 px-2 relative">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={200} gravity={0.4} />
      )}

      <h2 className="text-4xl font-bold mb-6">🎡 {wheel.emoji} {wheel.name}</h2>

      <div className="relative mb-4" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
        <div
          className="absolute top-0 left-1/2 z-30 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="w-0 h-0 border-l-[24px] border-r-[24px] border-t-[44px]
              border-l-transparent border-r-transparent border-t-yellow-400 
              animate-pulse-slow"
            style={{
              borderTopColor: "#facc15",
              filter: "drop-shadow(0 0 3px #000) drop-shadow(0 3px 4px #000)",
            }}
          />
        </div>

        <motion.div
          className="rounded-full shadow-inner overflow-hidden border-4 border-gray-800"
          style={{
            width: WHEEL_SIZE,
            height: WHEEL_SIZE,
            background: "radial-gradient(circle at center, #1f2937, #000)",
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.1, 1, 0.2, 1] }}
        >
          <svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          >
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
                    animate={resultIndex === i ? { scale: 1.12 } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <path
                      d={pathData}
                      fill={getSegmentColor(item.value)}
                      stroke="#111"
                      strokeWidth="0.75"
                      style={{
                        filter:
                          item.value === Math.max(...wheel.items.map((i) => i.value))
                            ? "drop-shadow(0 0 8px #facc15) drop-shadow(0 0 16px #fde047) drop-shadow(0 0 32px #fcd34d)"
                            : "none",
                        transition: "filter 0.3s ease",
                      }}
                    />

                    <text
  x={textX}
  y={textY}
  textAnchor="middle"
  alignmentBaseline="middle"
  fill={resultIndex === i ? "#ffffff" : "#eeeeee"}
  fontSize={resultIndex === i ? "17" : "16"}
  stroke="black"
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
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-lg"
        >
          SPIN
        </button>
      )}

      {result && (
        <div className="mt-6 text-center animate-pulse">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">🎉 You got: {result.name}</h2>
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => onSell?.(result.value)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-lg"
            >
              Sell for ${result.value}
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
