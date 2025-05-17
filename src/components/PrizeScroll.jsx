// src/components/PrizeScroll.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PrizeScroll({ finalValue, onDone }) {
  const [fakeValues, setFakeValues] = useState([]);
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    const generated = [];
    for (let i = 0; i < 50; i++) {
      generated.push(Math.floor(Math.random() * (finalValue * 2)) + 1);
    }
    generated.push(finalValue); // Final value at the end
    setFakeValues(generated);

    const timeout = setTimeout(() => {
      setScrolling(false);
      if (onDone) onDone();
    }, 3000); // Scroll duration

    return () => clearTimeout(timeout);
  }, [finalValue, onDone]);

  return (
    <div className="overflow-hidden w-full max-w-md h-20 border-2 border-white rounded bg-black relative z-30">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-92%" }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="flex gap-6 px-4"
      >
        {fakeValues.map((val, i) => (
          <div
            key={i}
            className={`w-20 h-16 flex items-center justify-center font-bold text-xl rounded ${
              val === finalValue && !scrolling ? "bg-yellow-500 text-black" : "text-white"
            }`}
          >
            ${val}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
