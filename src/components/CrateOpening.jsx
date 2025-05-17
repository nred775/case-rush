import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import useCrateSounds from "./useCrateSounds";

export default function CrateOpening({ crate, value, onSell, onAdd, onBack, onDrawn }) {
  const [opened, setOpened] = useState(false);
  const [prizeDone, setPrizeDone] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [shuffling, setShuffling] = useState(true);
  const [crateOrder, setCrateOrder] = useState([0, 1, 2, 3, 4]);
  const [drawnItem, setDrawnItem] = useState(null);
  const [openedCrates, setOpenedCrates] = useState([false, false, false, false, false]);
  const [centerItem, setCenterItem] = useState(null);
  const [width, height] = useWindowSize();
  const { playLidOpen } = useCrateSounds();

  const topValue = Math.max(...crate.items.map((item) => item.value));

  useEffect(() => {
    const items = crate.items;
    const realItem = items[Math.floor(Math.random() * items.length)];
    const fakes = Array.from({ length: 5 }, () =>
      items[Math.floor(Math.random() * items.length)]
    );
    fakes[2] = realItem;
    setDrawnItem(fakes);

    if (onDrawn) onDrawn(realItem);
  }, [crate, onDrawn]);

  useEffect(() => {
    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      setCrateOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
      shuffleCount++;
      if (shuffleCount >= 6) {
        clearInterval(shuffleInterval);
        setTimeout(() => {
          setCrateOrder((finalOrder) => {
            const centerIndex = finalOrder[2];
            const center = drawnItem?.[centerIndex] || null;
            setCenterItem(center);
            return finalOrder;
          });
          setShuffling(false);
        }, 200);
      }
    }, 200);
    return () => clearInterval(shuffleInterval);
  }, [drawnItem]);

  useEffect(() => {
    if (!shuffling && drawnItem) {
      setHighlighted(true);
      setTimeout(() => {
        const centerIndex = crateOrder[2];
        const item = drawnItem[centerIndex];
        const isTopPrize =
          crate.items.every((i) => i.value <= item.value) &&
          crate.items.filter((i) => i.value === item.value).length === 1;

        if (!isTopPrize) {
          playLidOpen();
        }

        setOpened(true);
      }, 1000);
    }
  }, [shuffling, drawnItem, crate.items, crateOrder, playLidOpen]);

  useEffect(() => {
    if (prizeDone) {
      crateOrder.forEach((crateId, visualIndex) => {
  if (visualIndex !== 2) {
    setTimeout(() => {
      setOpenedCrates((prev) => {
        const next = [...prev];
        next[crateId] = true;
        return next;
      });
    }, 800 + visualIndex * 400);
  }
});

    }
  }, [prizeDone]);

  const getGlow = (val, isTop) => {
  const ratio = val / crate.cost;
  if (isTop) return "from-yellow-300 via-white to-yellow-500 animate-goldPulse";
  if (ratio <= 0.5) return "from-gray-700 to-gray-900";
  if (ratio <= 1.0) return "from-sky-300 to-blue-400";
  return "from-purple-400 to-purple-800";
};


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <style>
        {`
        @keyframes goldPulse {
          0%, 100% {
            box-shadow: 0 0 15px #facc15, 0 0 5px #fef3c7;
          }
          50% {
            box-shadow: 0 0 30px #fde68a, 0 0 15px #fcd34d;
          }
        }
        .animate-goldPulse {
          animation: goldPulse 1.5s ease-in-out infinite;
        }

        @keyframes pingGold {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.6);
            opacity: 1;
            transform: scale(1);
          }
          100% {
            box-shadow: 0 0 20px 40px rgba(255, 215, 0, 0);
            opacity: 0;
            transform: scale(1.5);
          }
        }
        .animate-pingGold {
          animation: pingGold 1s ease-out;
        }
      `}
      </style>

      {prizeDone && (
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={value >= 50 ? 300 : 100}
            recycle={false}
            gravity={0.4}
            run={true}
          />
        </div>
      )}

      <div className="flex gap-6 mt-4 mb-2">
        <AnimatePresence>
          {crateOrder.map((crateId, visualIndex) => {
            const isCenter = visualIndex === 2;
            const item = drawnItem?.[crateId];
            const isOpened = isCenter ? opened : openedCrates[crateId];
            const darkenLosers = !isCenter && prizeDone;
            const isTopPrize = item?.value === topValue;

            return (
              <motion.div
                key={crateId}
                layout
                animate={{
                  y: isCenter && highlighted ? -30 : 0,
                  scale: isCenter && highlighted ? 1.06 : 1,
                  rotateX: isCenter && highlighted ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className={`w-32 h-32 sm:w-40 sm:h-40 rounded-xl relative z-20
                  bg-gradient-to-br ${getGlow(item?.value, isTopPrize)}
                  ${darkenLosers ? "opacity-40 grayscale" : ""}
                  ${isCenter && prizeDone ? "ring-4 ring-yellow-400" : ""}
                `}
                style={{ perspective: "1000px" }}
              >
                {isCenter && prizeDone && isTopPrize && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none z-10 animate-pingGold" />
                )}

                {isOpened && (
                  <motion.div
                    initial={{ y: 80, scale: 0.9, opacity: 0 }}
                    animate={{ y: -70, scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                      delay: isCenter ? 0.2 : 0,
                    }}
                    onAnimationComplete={() => {
                      if (isCenter) {
                        setPrizeDone(true);
                        if (item?.value === topValue) {
                          const audio = new Audio("/sounds/rare-sparkle.mp3");
                          audio.volume = 0.5;
                          audio.play();
                        }
                      }
                    }}
                    className="absolute w-full flex flex-col items-center z-30 pointer-events-none"
                  >
                    <span className="text-white text-xl sm:text-2xl font-semibold drop-shadow-md">
                      {item?.name}
                    </span>
                  </motion.div>
                )}

                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gray-500 rounded-t-xl border-b-4 border-gray-800 z-20"
                  initial={{ rotateX: 0 }}
                  animate={
                    isOpened
                      ? {
                          rotateX: -130,
                          translateY: "-6px",
                          transition: { duration: 0.8, ease: "easeInOut" },
                        }
                      : {}
                  }
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "bottom center",
                  }}
                />

                <div
                  className={`absolute bottom-0 w-full h-2/3 rounded-b-xl border-t-4 border-gray-900 shadow-inner z-10 bg-gradient-to-br ${getGlow(
                    item?.value,
                    isTopPrize
                  )}`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Opening the {crate.emoji} {crate.name}
        </h2>
      </div>

      {prizeDone && (
        <div className="mt-4 flex gap-4 z-50">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => onSell(centerItem?.value)}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold text-lg"
          >
            Sell for ${centerItem?.value}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => onAdd(centerItem)}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold text-lg"
          >
            Add to Inventory
          </motion.button>
        </div>
      )}
    </div>
  );
}
