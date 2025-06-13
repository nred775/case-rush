import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const deckSize = 10;
const offset = 1.2;
const shiftAmount = ((deckSize - 1) * offset) / 2;

export default function CardShuffleDeck({ isShuffling }) {
  const [shuffleCount, setShuffleCount] = useState(0);
  const [shufflingOrder, setShufflingOrder] = useState(
    [...Array(deckSize)].map((_, i) => deckSize - i)
  );

  useEffect(() => {
    if (isShuffling) {
      setShuffleCount(1); // First shuffle

      const timer1 = setTimeout(() => setShuffleCount(2), 1800); // Second shuffle
      const timer2 = setTimeout(() => setShuffleCount(3), 3300); // Collapse to single card
      const timer3 = setTimeout(() => setShuffleCount(0), 4500); // Reset fully

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isShuffling]);

  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      <div className="relative w-[104px] h-[156px]">
        {[...Array(deckSize)].map((_, i) => {
          const isLeftPile = i % 2 === 0;
          const delay = i * 0.05;
          const splitX = isLeftPile ? -60 : 60;
          const liftY = -40;
          const isTopCard = shufflingOrder[i] === deckSize;

          let animateProps = { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 };

          if (shuffleCount === 1 || shuffleCount === 2) {
            animateProps = {
              x: [0, splitX, 0],
              y: [0, liftY, 0],
              rotate: [0, isLeftPile ? -5 : 5, 0],
              transition: {
                duration: 1.2,
                delay,
                ease: "easeInOut",
              },
            };
          }

          if (shuffleCount === 3) {
            animateProps = {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: isTopCard ? 1 : 0,
              scale: isTopCard ? 1 : 0.9,
              transition: {
                duration: 0.6,
                delay: i * 0.03,
              },
            };
          }

          const zIndex = isTopCard ? 100 : shufflingOrder[i];

          return (
            <motion.div
              key={i + "-" + shuffleCount}
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={animateProps}
              className="absolute w-[104px] h-[156px] bg-gray-700 border border-gray-400 rounded-xl shadow-md"
              style={{
                top: `${i * offset}px`,
                left: `${i * offset}px`,
                transform: `translate(-${shiftAmount}px, -${shiftAmount}px)`,
                zIndex,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
