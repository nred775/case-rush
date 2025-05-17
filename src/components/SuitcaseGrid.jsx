import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SuitcaseGrid({ crate, itemValue, onSell, onAdd }) {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [fakeValues, setFakeValues] = useState([]);
  const [opened, setOpened] = useState([false, false, false, false, false]);

  useEffect(() => {
    const values = [...Array(5)].map(() =>
      getRandomValue(crate.minValue, crate.maxValue)
    );
    setFakeValues(values);
  }, [crate]);

  const handleOpen = (index) => {
    if (openedIndex !== null) return;

    const updated = [...fakeValues];
    updated[index] = itemValue;
    setFakeValues(updated);
    setOpenedIndex(index);

    [...Array(5)].forEach((_, i) => {
      setTimeout(() => {
        setOpened((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i === index ? 1400 : 400 + i * 150);
    });

    setTimeout(() => {
      setRevealed(true);
    }, 1600);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h2 className="text-2xl font-bold">
        Opening a {crate.emoji} {crate.name}
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {fakeValues.map((value, i) => (
          <div
            key={i}
            className="w-28 h-24 relative cursor-pointer"
            onClick={() => handleOpen(i)}
          >
            {/* Suitcase Base */}
            <div className="absolute bottom-0 w-full h-3/5 bg-gray-800 rounded-b-xl shadow-lg border-t border-gray-700 flex items-center justify-center">
              {opened[i] && (
                <span className="text-white font-bold text-lg">${value}</span>
              )}
            </div>

            {/* Suitcase Lid */}
            <motion.div
              className="absolute top-0 w-full h-2/5 bg-gray-600 rounded-t-xl border-b-2 border-gray-700"
              animate={
                opened[i]
                  ? {
                      rotateX: -110,
                      transformOrigin: "bottom center",
                      translateY: "-5px",
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            />
          </div>
        ))}
      </div>

      {revealed && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => onSell(itemValue)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
          >
            Sell for ${itemValue}
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
          >
            Add to Inventory
          </button>
        </div>
      )}
    </div>
  );
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
