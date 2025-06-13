// src/components/FateShopPage.jsx
import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import generateFatePack from "../utils/generateFatePack";
import RegularCard from "../utils/RegularCard";

const getCardBackStyles = (card) => {
  const rarity =
    card.type === "choice"
      ? "choice"
      : card.type === "power"
      ? card.rarity
      : card.value >= 2 && card.value <= 5
      ? "basic"
      : card.value >= 6 && card.value <= 10
      ? "sturdy"
      : card.value >= 11 && card.value <= 13
      ? "noble"
      : card.value === 14
      ? "mythic"
      : "basic";

  return `bg-cover bg-center border-2 border-white shadow-md rounded-xl`;
};

const getCardBackImage = (card) => {
  const rarity =
    card.type === "choice"
      ? "choice"
      : card.type === "power"
      ? card.rarity
      : card.value >= 2 && card.value <= 5
      ? "basic"
      : card.value >= 6 && card.value <= 10
      ? "sturdy"
      : card.value >= 11 && card.value <= 13
      ? "noble"
      : card.value === 14
      ? "mythic"
      : "basic";

  return `/fate-card-backs/${rarity}.jpg`;
};
const getBackBorderColor = (card) => {
  const rarity =
    card.type === "choice"
      ? "choice"
      : card.type === "power"
      ? card.rarity
      : card.value >= 2 && card.value <= 5
      ? "basic"
      : card.value >= 6 && card.value <= 10
      ? "sturdy"
      : card.value >= 11 && card.value <= 13
      ? "noble"
      : card.value === 14
      ? "mythic"
      : "basic";

  const colorMap = {
    basic: "border-gray-400",
    sturdy: "border-green-500",
    noble: "border-blue-400",
    mythic: "border-purple-500",
    choice: "border-lime-400",
    rare: "border-red-500",
    epic: "border-blue-500",
    legendary: "border-yellow-400",
  };

  return colorMap[rarity] || "border-white";
};


const getRarityAnimation = (card) => {
  const value = card.value;
  if (value >= 2 && value <= 5) return "animate-common";
  if (value >= 6 && value <= 10) return "animate-rare";
  if (value >= 11 && value <= 13) return "animate-epic";
  if (value === 14 || value === 15) return "animate-legendary";
  if (value === 16) return "animate-mythic";
  return "";
};

export default function FateShopPage({ user, opals, setOpals, saveUserData }) {
  const [opening, setOpening] = useState(false);
  const [results, setResults] = useState(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [canClickNext, setCanClickNext] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [slam, setSlam] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);

  const openCustomPack = async (cost, cardCount) => {
    if (!user || user.isAnonymous) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const currentOpals = data.opals || 0;
    if (currentOpals < cost) {
  setErrorMessage("Not enough opals!");
  setTimeout(() => setErrorMessage(null), 3000); // hide after 3s
  return;
}


    setOpening(true);
    const { pack } = generateFatePack(cardCount, 0, 0); // no specials

let updatedCards = [...(data.ownedFateCards || [])];
let updatedPowerCards = [...(data.ownedPowerCards || [])];
let updatedChoiceCards = [...(data.ownedChoiceCards || [])];

    let bonusOpals = 0;

    const cardExists = (arr, card) =>
      arr.some((c) => c.name === card.name && (c.suit === card.suit || (!c.suit && !card.suit)));

    const getCardValue = (val) => {
      if (val >= 2 && val <= 5) return 1;
      if (val >= 6 && val <= 10) return 3;
      if (val >= 11 && val <= 13) return 7;
      if (val === 14 || val === 15) return 15;
      if (val === 16) return 20;
      return 5;
    };

    for (const card of pack) {
      if (card.type === "power") {
  if (!cardExists(updatedPowerCards, card)) {
    updatedPowerCards.push(card);
  } else {
    bonusOpals += getCardValue(card.value);
  }
} else if (card.type === "choice") {
  if (!cardExists(updatedChoiceCards, card)) {
    updatedChoiceCards.push(card);
  } else {
    bonusOpals += getCardValue(card.value);
  }
} else {
  if (!cardExists(updatedCards, card)) {
    updatedCards.push(card);
  } else {
    bonusOpals += getCardValue(card.value);
  }
}


    }

    const newOpals = currentOpals - cost + bonusOpals;

    await setDoc(
  userRef,
  {
    opals: newOpals,
    ownedFateCards: updatedCards,
    ownedPowerCards: updatedPowerCards,
    ownedChoiceCards: updatedChoiceCards, // ← added
  },
  { merge: true }
);



    setOpals(newOpals);
    setResults({ pack, bonusOpals });
    setRevealIndex(0);
    setFlipped(false);
    setOpening(false);
  };

  const revealList = results ? results.pack : [];

  React.useEffect(() => {
    if (!results || revealIndex !== 0) return;

    setFlipped(false);
    setCardVisible(true);

    const timer = setTimeout(() => {
      setFlipped(true);
      setSlam(true);
      setTimeout(() => setSlam(false), 1000);
      setCanClickNext(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [results, revealIndex]);

  const closePopup = () => {
    setResults(null);
    setRevealIndex(0);
    setFlipped(false);
    setCardVisible(true);
    setCanClickNext(false);
    setSlam(false);
  };

  return (
    <div className="text-white p-6">
    {errorMessage && (
  <div className="mb-4 text-center text-red-400 font-bold bg-black bg-opacity-50 border border-red-500 px-4 py-2 rounded-xl animate-pulse">
    {errorMessage}
  </div>
)}

      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
        Fate Shop
      </h1>
      <p className="mb-4">Choose your Fate Pack:</p>
      <div className="flex flex-wrap gap-8 mb-10 justify-center">
        <button
          className="relative w-[156px] h-[234px] rounded-2xl border-[5px] border-yellow-400 overflow-hidden shadow-xl hover:scale-105 transform transition duration-300"
          onClick={() => openCustomPack(25, 1)}
          disabled={opening}
        >
          <img
            src="/fate-pack-images/pack_small.jpg"
            alt="25 Opals Pack"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-0 w-full text-sm font-extrabold text-yellow-100 bg-black bg-opacity-70 py-2 text-center">
            25 Opals
          </div>
        </button>

        <button
          className="relative w-[156px] h-[234px] rounded-2xl border-[5px] border-purple-400 overflow-hidden shadow-xl hover:scale-105 transform transition duration-300"
          onClick={() => openCustomPack(100, 5)}
          disabled={opening}
        >
          <img
            src="/fate-pack-images/pack_medium.jpg"
            alt="100 Opals Pack"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-0 w-full text-sm font-extrabold text-purple-100 bg-black bg-opacity-70 py-2 text-center">
            100 Opals
          </div>
        </button>

        <button
          className="relative w-[156px] h-[234px] rounded-2xl border-[5px] border-green-400 overflow-hidden shadow-xl hover:scale-105 transform transition duration-300"
          onClick={() => openCustomPack(200, 12)}
          disabled={opening}
        >
          <img
            src="/fate-pack-images/pack_large.jpg"
            alt="200 Opals Pack"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-0 w-full text-sm font-extrabold text-green-100 bg-black bg-opacity-70 py-2 text-center">
            200 Opals
          </div>
        </button>
      </div>

      {results && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={revealIndex >= revealList.length ? closePopup : undefined}
        >
          <div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-md border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-white mb-4 text-center">You Got:</h2>
            <div className="flex justify-center">
              {revealIndex < revealList.length ? (
                <div
                  onClick={() => {
                    if (!canClickNext) return;
                    setCanClickNext(false);
                    setCardVisible(false);
                    setTimeout(() => {
                      setRevealIndex((prev) => prev + 1);
                      setFlipped(false);
                      setCardVisible(true);
                      setTimeout(() => {
                        setFlipped(true);
                        setSlam(true);
                        setTimeout(() => setSlam(false), 1000);
                        setCanClickNext(true);
                      }, 3000);
                    }, 500);
                  }}
                  className={canClickNext ? "cursor-pointer" : ""}
                >
                  <div className="w-[104px] h-[156px] relative">
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        cardVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="w-full h-full perspective">
                        <div
                          className="relative w-full h-full transform-style-preserve-3d transition-transform duration-1000 ease-out"
                          style={{
                            transform: `
                              ${flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
                              ${slam ? "scale(2.5)" : "scale(1)"}
                            `,
                          }}
                        >
                          {/* Back */}
<div
  className={`absolute inset-0 backface-hidden rounded-xl border-4 shadow-md bg-cover bg-center ${
    getBackBorderColor(revealList[revealIndex])
  } ${!flipped ? getRarityAnimation(revealList[revealIndex]) : ""}`}
  style={{
    backgroundImage: `url(${getCardBackImage(revealList[revealIndex])})`,
  }}
/>



                          {/* Front */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180">
                            {flipped && (
                              <RegularCard
                                card={revealList[revealIndex]}
                                isSelected={false}
                                onClick={() => {}}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-2 text-sm text-gray-300">
                    {canClickNext ? "Click to continue" : "Revealing..."}
                  </p>
                </div>
              ) : (
                <div className="text-center text-white">
                  <h3 className="text-lg font-semibold mb-4">All Rewards:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
                    {results.pack.map((card, idx) => (
                      <RegularCard
                        key={idx}
                        card={card}
                        isSelected={false}
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                  {results.bonusOpals > 0 && (
                    <div className="mt-4 text-green-300 font-medium">
                      +{results.bonusOpals} bonus opals from duplicates!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
