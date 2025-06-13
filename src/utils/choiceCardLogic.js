// src/utils/choiceCardLogic.js

export function resolveChoiceCard(card, context) {
  const {
    opponentCard,
    lastWinner,
    playerScore,
    opponentScore,
    lastPlayerCard,
    roundNumber,
  } = context;

  switch (card.name) {
    case "Head Chopper":
  // Beats J, Q, K, Comeback Jack, The King, and Queen's Wrath
  return ["J", "Q", "K", "Comeback Jack", "The King", "Queen’s Wrath"].includes(opponentCard?.name)
    ? { value: 99, bonusPoints: 0 }
    : { value: 0, bonusPoints: 0 };



    case "Joker Topper":
      // Only beats Jokers
      return opponentCard?.name?.includes("Joker")
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

   case "Even Slayer":
  // Beats even-numbered regular cards and select power cards
  const evenSlayerTargets = [
    "10 of Might",
    "Elite Eight",
    "Ace of Power",
    "Queen’s Wrath",
  ];
  const isRegularEven = opponentCard?.type === "regular" && opponentCard?.value % 2 === 0;
  const isNamedTarget = evenSlayerTargets.includes(opponentCard?.name);
  return isRegularEven || isNamedTarget
    ? { value: 99, bonusPoints: 0 }
    : { value: 0, bonusPoints: 0 };



    case "Heart Breaker":
      return opponentCard?.suit === "hearts"
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Spade Slicer":
      return opponentCard?.suit === "spades"
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Diamond Dagger":
      return opponentCard?.suit === "diamonds"
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Club Crusher":
      return opponentCard?.suit === "clubs"
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Desperation Draw":
      return playerScore <= opponentScore - 3
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Time Bomb":
      return roundNumber === 8
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Echo":
      return {
        value: lastPlayerCard?.value ?? 0,
        bonusPoints: 0,
      };

    default:
      return { value: card.value, bonusPoints: 0 };
  }
}
