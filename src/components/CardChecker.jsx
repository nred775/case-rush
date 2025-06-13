// Final CardChecker.jsx that uses RegularCard for image and hover with true descriptions
import React, { useState } from "react";
import RegularCard from "../utils/RegularCard";
import { resolvePowerCard } from "../utils/powerCardLogic";
import { resolveChoiceCard } from "../utils/choiceCardLogic";
import powerCards from "../data/powercards";
import choiceCards from "../data/choicecards";

const regularCards = [
  { name: "2", value: 2, suit: "hearts", type: "regular" },
  { name: "3", value: 3, suit: "spades", type: "regular" },
  { name: "4", value: 4, suit: "diamonds", type: "regular" },
  { name: "5", value: 5, suit: "clubs", type: "regular" },
  { name: "6", value: 6, suit: "hearts", type: "regular" },
  { name: "7", value: 7, suit: "spades", type: "regular" },
  { name: "8", value: 8, suit: "diamonds", type: "regular" },
  { name: "9", value: 9, suit: "clubs", type: "regular" },
  { name: "10", value: 10, suit: "hearts", type: "regular" },
  { name: "J", value: 11, suit: "spades", type: "regular" },
  { name: "Q", value: 12, suit: "diamonds", type: "regular" },
  { name: "K", value: 13, suit: "clubs", type: "regular" },
  { name: "A", value: 14, suit: "hearts", type: "regular" },
];

const allCards = [
  ...regularCards,
  ...powerCards.map((c) => ({ ...c, type: "power" })),
  ...choiceCards.map((c) => ({ ...c, type: "choice" })),
];

export default function CardChecker() {
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [result, setResult] = useState(null);

  const handleCardClick = (card) => {
    if (card1 && card1.name === card.name && card1.suit === card.suit) {
      setCard1(null);
    } else if (card2 && card2.name === card.name && card2.suit === card.suit) {
      setCard2(null);
    } else if (!card1) {
      setCard1(card);
    } else if (!card2) {
      setCard2(card);
    }
  };

  const handleCompare = () => {
    if (!card1 || !card2) return;

    let c1Resolved = card1;
    let c2Resolved = card2;

    const context = {
      opponentCard: card2,
      lastWinner: "player",
      playerScore: 3,
      opponentScore: 3,
      lastPlayerCard: card1,
      roundNumber: 10,
    };

    if (card1.type === "power") c1Resolved = { ...card1, ...resolvePowerCard(card1, context) };
    if (card1.type === "choice") c1Resolved = { ...card1, ...resolveChoiceCard(card1, context) };

    context.opponentCard = card1;
    if (card2.type === "power") c2Resolved = { ...card2, ...resolvePowerCard(card2, context) };
    if (card2.type === "choice") c2Resolved = { ...card2, ...resolveChoiceCard(card2, context) };

    if (c1Resolved.value > c2Resolved.value) setResult("Left card wins ✅");
    else if (c1Resolved.value < c2Resolved.value) setResult("Right card wins ✅");
    else setResult("It's a tie 🤝");
  };

  return (
  <div className="min-h-screen p-10 text-white flex flex-col items-center">
    <h1 className="text-4xl font-bold text-pink-400 mb-6 drop-shadow">🧠 Card Checker</h1>

    {/* Selected Cards + Compare Button */}
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-8 mb-4">
        <div>{card1 && <RegularCard card={card1} />}</div>
        <div className="text-3xl font-bold text-gray-300">VS</div>
        <div>{card2 && <RegularCard card={card2} />}</div>
      </div>

      <button
        onClick={handleCompare}
        disabled={!card1 || !card2}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
      >
        Compare
      </button>

      {result && (
        <p className="mt-4 text-2xl font-bold text-green-300 animate-pulse">{result}</p>
      )}
    </div>

    {/* All Cards Grid */}
    <div className="flex flex-wrap justify-center gap-4 max-w-6xl">
      {allCards.map((card, i) => (
        <div key={i} onClick={() => handleCardClick(card)}>
          <RegularCard card={card} isSelected={card === card1 || card === card2} />
        </div>
      ))}
    </div>
  </div>
);

}