// src/components/FateDeckPage.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import fateCards from "../data/fatecards";
import RegularCard from "../utils/RegularCard";
import powerCards from "../data/powercards";
import choiceCards from "../data/choicecards";


export default function FateDeckPage({
  user,
  balance,
  setBalance,
  saveUserData,
}) {
  const [loading, setLoading] = useState(true);
  const [equippedCards, setEquippedCards] = useState([]);
  const [ownedCards, setOwnedCards] = useState([]);
  const [sortOption, setSortOption] = useState("value-asc");
const [ownedPowerCards, setOwnedPowerCards] = useState([]);
const [equippedPowerCards, setEquippedPowerCards] = useState([]);
const [ownedChoiceCards, setOwnedChoiceCards] = useState([]);
const [equippedChoiceCards, setEquippedChoiceCards] = useState([]);


const displayValue = (val) => {
  if (val === 11) return "J";
  if (val === 12) return "Q";
  if (val === 13) return "K";
  if (val === 14) return "A";
  if (val === 15) return "JOKER";
  return val;
};
const sortCards = (cards) => {
  return [...cards].sort((a, b) => {
    if (sortOption === "value-asc") return a.value - b.value;
    if (sortOption === "value-desc") return b.value - a.value;
    if (sortOption === "suit") {
      const suitOrder = { hearts: 0, diamonds: 1, clubs: 2, spades: 3 };
      if (a.suit === b.suit) return a.value - b.value;
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return 0;
  });
};


const getCardImage = (value, suit) => {
  const suitCode = suit?.toLowerCase();
  const valueCode = value === 15 ? "joker" :
                    value === 14 ? "ace" :
                    value === 13 ? "king" :
                    value === 12 ? "queen" :
                    value === 11 ? "jack" : value;

  return `/fate-card-images/${valueCode}_${suitCode}.jpg`;
};



const suitBorderColor = {
  hearts: "border-red-500",
  diamonds: "border-red-500",
  clubs: "border-green-600",
  spades: "border-gray-800", // <- updated
};



  useEffect(() => {
    if (!user || user.isAnonymous) return;
    const setupFateData = async () => {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) return;
      const data = snap.data();

      const hasFateData =
  data.ownedFateCards &&
  data.equippedFateCards;


      if (!hasFateData) {
const starterDeck = fateCards.filter(
  (card) =>
    (card.value >= 2 && card.value <= 5) ||
    (card.value === 6 && (card.suit === "clubs" || card.suit === "hearts"))
);


const starterPowers = powerCards.filter((card) =>
  ["Ten of Might", "Elite Eight", "Blackjack Buster", "Lucky Seven", "Risky Joker"].includes(card.name)
);
  const starterChoices = choiceCards.filter((card) =>
  ["Heart Breaker", "Head Chopper", "Desperation Draw"].includes(card.name)
);


  await setDoc(
  userRef,
  {
    ownedFateCards: starterDeck,
    equippedFateCards: starterDeck,
    ownedPowerCards: starterPowers,
    equippedPowerCards: starterPowers,
    ownedChoiceCards: starterChoices,
    equippedChoiceCards: starterChoices, // ✅ NEW
  },
  { merge: true }
);




  setOwnedCards(starterDeck);
  setEquippedCards(starterDeck);
  setOwnedPowerCards(starterPowers);
  setEquippedPowerCards(starterPowers);
    setOwnedChoiceCards(starterChoices); // ✅ add this line
setEquippedChoiceCards(starterChoices); // ✅ NEW

}
 else {
        setOwnedCards((data.ownedFateCards || []).sort((a, b) => a.value - b.value));
setEquippedCards((data.equippedFateCards || []).sort((a, b) => a.value - b.value));
setOwnedPowerCards(data.ownedPowerCards || []);
setEquippedPowerCards(data.equippedPowerCards || []);
setOwnedChoiceCards(data.ownedChoiceCards || []);
setEquippedChoiceCards(data.equippedChoiceCards || []); // ✅ NEW


      }

      setLoading(false);
    };

    setupFateData();
  }, [user]);

const toggleEquip = async (item, type) => {
  const userRef = doc(db, "users", user.uid);

  if (type === "card") {
    const max = 18;
    const isEquipped = equippedCards.some(
      (c) => c.name === item.name && c.suit === item.suit
    );

    let updated;
    if (isEquipped) {
      updated = equippedCards.filter(
        (c) => !(c.name === item.name && c.suit === item.suit)
      );
    } else if (equippedCards.length < max) {
      updated = [...equippedCards, item];
    } else {
      alert(`You can only equip ${max} cards.`);
      return;
    }

    setEquippedCards(updated);
    await setDoc(userRef, { equippedFateCards: updated }, { merge: true });
  }

  if (type === "power") {
    const max = 5;
    const isEquipped = equippedPowerCards.some((c) => c.name === item.name);

    let updated;
    if (isEquipped) {
      updated = equippedPowerCards.filter((c) => c.name !== item.name);
    } else if (equippedPowerCards.length < max) {
      updated = [...equippedPowerCards, item];
    } else {
      alert(`You can only equip ${max} power cards.`);
      return;
    }

    setEquippedPowerCards(updated);
    await setDoc(userRef, { equippedPowerCards: updated }, { merge: true });
  }

  if (type === "choice") {
    const max = 3;
    const isEquipped = equippedChoiceCards.some((c) => c.name === item.name);

    let updated;
    if (isEquipped) {
      updated = equippedChoiceCards.filter((c) => c.name !== item.name);
    } else if (equippedChoiceCards.length < max) {
      updated = [...equippedChoiceCards, item];
    } else {
      alert(`You can only equip ${max} choice cards.`);
      return;
    }

    setEquippedChoiceCards(updated);
    await setDoc(userRef, { equippedChoiceCards: updated }, { merge: true });
  }
};



const autoMakeDeck = async () => {
  const userRef = doc(db, "users", user.uid);

  // Include all cards with a numeric value — including custom cards (value 16)
  const all = ownedCards.filter((c) => typeof c.value === "number");

  // Sort by value DESCENDING (value 16 cards will come first)
  const sorted = [...all].sort((a, b) => b.value - a.value);

  // Pick top 26
  const selected = sorted.slice(0, 18);

  setEquippedCards(selected);
  await setDoc(userRef, { equippedFateCards: selected }, { merge: true });
};




  const isEquipped = (item) => {
  return equippedCards.some((c) => c.name === item.name && c.suit === item.suit);
};


  if (loading) return <div className="text-white p-4">Loading fate deck...</div>;

return (
  <div className="text-white p-6">
    <h1 className="text-3xl font-bold mb-4">🃏 Customize Fate Deck</h1>

    <div className="mb-6">
      <h2 className="text-xl font-semibold">Equipped Main Deck (18)</h2>
      <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2">
        {sortCards(equippedCards).map((card, idx) => {
          const isSelected = true;
          return (
            <div className="relative" key={idx}>
              <div
                className={`relative w-[104px] h-[156px] rounded-xl overflow-hidden shadow-md cursor-pointer border-2 ${
                  isSelected
                    ? "border-yellow-600 shadow-[0_0_10px_3px_rgba(250,204,21,0.8)]"
                    : `bg-gray-200 text-black ${
                        suitBorderColor[card.suit] || "border-gray-500"
                      }`
                }`}
                onClick={() => toggleEquip(card, "card")}
              >
                <div className="flex justify-center items-center h-full relative w-full">
                  <RegularCard
                    card={card}
                    isSelected={isEquipped(card)}
                    onClick={() => toggleEquip(card, "card")}
                  />
                </div>
                {card.value < 11 && (
                  <div
                    className={`text-sm self-end ${
                      card.suit === "hearts" || card.suit === "diamonds"
                        ? "text-red-500"
                        : "text-gray-100"
                    }`}
                  >
                    {displayValue(card.value)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4 mt-4">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-800 text-white border border-gray-400 p-1 rounded"
        >
          <option value="value-asc">Value Ascending</option>
          <option value="value-desc">Value Descending</option>
          <option value="suit">Suit</option>
        </select>
      </div>

      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded mb-4"
        onClick={autoMakeDeck}
      >
        Auto Make Deck
      </button>

      <h3 className="text-md mt-2 mb-1">Owned Cards</h3>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {sortCards(ownedCards).map((card, idx) => {
          const isSelected = isEquipped(card);
          return (
            <div className="relative" key={idx}>
              <div
                className={`relative w-[104px] h-[156px] rounded-xl overflow-hidden shadow-md cursor-pointer border-2 ${
                  isSelected
                    ? "border-yellow-600 shadow-[0_0_10px_3px_rgba(250,204,21,0.8)]"
                    : `bg-gray-200 text-black ${
                        suitBorderColor[card.suit] || "border-gray-500"
                      }`
                }`}
                onClick={() => toggleEquip(card, "card")}
              >
                <div className="flex justify-center items-center h-full relative w-full">
                  <RegularCard
                    card={card}
                    isSelected={isEquipped(card)}
                    onClick={() => toggleEquip(card, "card")}
                  />
                </div>
                {card.value < 11 && (
                  <div
                    className={`text-sm self-end ${
                      card.suit === "hearts" || card.suit === "diamonds"
                        ? "text-red-500"
                        : "text-gray-100"
                    }`}
                  >
                    {displayValue(card.value)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-semibold mt-6">Equipped Power Cards (5 max)</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {equippedPowerCards.map((card, idx) => (
          <div key={idx} className="relative">
            <RegularCard
              card={card}
              isSelected={true}
              onClick={() => toggleEquip(card, "power")}
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Owned Power Cards</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {ownedPowerCards.map((card, idx) => {
          const isSelected = equippedPowerCards.some((c) => c.name === card.name);
          return (
            <div key={idx} className="relative">
              <RegularCard
                card={card}
                isSelected={isSelected}
                onClick={() => toggleEquip(card, "power")}
              />
            </div>
          );
        })}
      </div>
      <h2 className="text-xl font-semibold mt-6">Equipped Choice Cards (3 max)</h2>
<div className="flex flex-wrap gap-2 mt-2">
  {equippedChoiceCards.map((card, idx) => (
    <div key={idx} className="relative">
      <RegularCard
        card={card}
        isSelected={true}
        onClick={() => toggleEquip(card, "choice")}
      />
    </div>
  ))}
</div>

<h2 className="text-xl font-semibold mt-6">Owned Choice Cards</h2>
<div className="flex flex-wrap gap-2 mt-2">
  {ownedChoiceCards.map((card, idx) => {
    const isSelected = equippedChoiceCards.some((c) => c.name === card.name);
    return (
      <div key={idx} className="relative">
        <RegularCard
          card={card}
          isSelected={isSelected}
          onClick={() => toggleEquip(card, "choice")}
        />
      </div>
    );
  })}
</div>



    </div>
  </div>
);


}