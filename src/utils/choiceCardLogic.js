// src/utils/choiceCardLogic.js
import { resolvePowerCard } from "./powerCardLogic"; // Make sure this import is at the top


const choiceCardBeatsMap = {
  "Head Chopper": ["J", "Q", "K", "Comeback Jack", "The King", "Queen’s Wrath", "Crowned Victor", "Crowned Punisher"],
  "Joker Topper": ["Joker (Red)", "Joker (Black)"],
  "Even Slayer": ["10 of Might", "Elite Eight", "Ace of Power", "Queen’s Wrath"],
  "Heart Breaker": ["♥"],
  "Spade Slicer": ["♠"],
  "Diamond Dagger": ["♦"],
  "Club Crusher": ["♣"],
  // The following are special logic cases handled in the function
  "Desperation Draw": [],
  "Time Bomb": [],
  "Echo": [],
};

export function resolveChoiceCard(card, context) {
  const {
    opponentCard,
    lastWinner,
    playerScore,
    opponentScore,
    lastPlayerCard,
    roundNumber,
  } = context;

  const name = card.name;
  const oppName = opponentCard?.name;
  const oppSuit = opponentCard?.suit;
  const oppValue = opponentCard?.value;
  const oppSymbol = suitToSymbol(oppSuit);
console.log("Resolving", name, "vs", opponentCard?.name, opponentCard?.type);

  if (name === "Desperation Draw") {
    return playerScore <= opponentScore - 3 ? { value: 99, bonusPoints: 0 } : { value: 0, bonusPoints: 0 };
  }

  if (name === "Time Bomb") {
    return roundNumber === 8 ? { value: 99, bonusPoints: 0 } : { value: 0, bonusPoints: 0 };
  }





  // Handle suit-based win logic
  if (["Heart Breaker", "Spade Slicer", "Diamond Dagger", "Club Crusher"].includes(name)) {
    return choiceCardBeatsMap[name].includes(oppSymbol)
      ? { value: 99, bonusPoints: 0 }
      : { value: 0, bonusPoints: 0 };
  }

    const beatsList = choiceCardBeatsMap[name] || [];

const normalizedOppName = (oppName || "")
  .toLowerCase()
  .replace(/[^a-z0-9]/gi, "")
  .trim();

const normalizedBeatsList = (beatsList || []).map(n =>
  n.toLowerCase().replace(/[^a-z0-9]/gi, "").trim()
);

const isEvenCard = oppValue % 2 === 0 || normalizedOppName === "10ofmight";

let wins = false;

if (name === "Head Chopper") {
  wins = [11, 12, 13].includes(oppValue) || normalizedBeatsList.includes(normalizedOppName);
} else if (name === "Even Slayer") {
  wins = isEvenCard || normalizedBeatsList.includes(normalizedOppName);
} else {
  wins = normalizedBeatsList.includes(normalizedOppName);
}



  return wins ? { value: 99, bonusPoints: 0 } : { value: 0, bonusPoints: 0 };


}

function suitToSymbol(suit) {
  switch (suit) {
    case "hearts": return "♥";
    case "diamonds": return "♦";
    case "clubs": return "♣";
    case "spades": return "♠";
    default: return "";
  }
}
