// src/utils/powerCardLogic.js

export function resolvePowerCard(card, context) {
  const {
    opponentCard,
    opponentResolvedValue,
    lastWinner,
    playerScore,
    opponentScore,
  } = context;

  const oppVal = opponentResolvedValue ?? opponentCard.value;

  switch (card.name) {
    case "Fate’s End":
      return { value: 100, bonusPoints: 0 }; // unbeatable

    case "Joker (Red)":
    case "Joker (Black)":
      return oppVal <= 14
        ? { value: 15, bonusPoints: 0 }
        : { value: 15, bonusPoints: 0 }; // loses to 16+

    case "Comeback Jack":
      return playerScore <= opponentScore - 4
        ? { value: 11, bonusPoints: 3 }
        : { value: 11, bonusPoints: 0 };

    case "Crowned Punisher":
      return oppVal === 12
        ? { value: 13, bonusPoints: 4 }
        : { value: 13, bonusPoints: 0 };

    case "Vengeful Nine":
      return lastWinner === "opponent"
        ? { value: 14, bonusPoints: 2 }
        : { value: 9, bonusPoints: 0 };

    case "The King":
      return { value: 13, bonusPoints: 2 };

    case "Ace of Power":
      return { value: 14, bonusPoints: 1 };

    case "Risky Joker":
      return playerScore < opponentScore
        ? { value: 15, bonusPoints: 0 }
        : { value: 2, bonusPoints: 0 };

    case "Queen’s Wrath":
      return { value: 12, bonusPoints: 1 };

    case "Momentum Spike":
      return lastWinner === "player"
        ? { value: 99, bonusPoints: 0 }
        : { value: 0, bonusPoints: 0 };

    case "Crowned Victor":
      return playerScore >= opponentScore + 3
        ? { value: 13, bonusPoints: 1 }
        : { value: 13, bonusPoints: 0 };

    case "Lucky Seven":
      if (
        oppVal < 7 ||
        (oppVal > 7 && oppVal % 2 === 1)
      ) {
        return { value: 7, bonusPoints: 0 };
      }
      return { value: 7, bonusPoints: 0 };

    case "Ten of Might":
      return { value: 10, bonusPoints: 1 };

    case "Elite Eight":
      return { value: 8, bonusPoints: 1 };

    case "Executioner Nine":
      return oppVal === 8
        ? { value: 9, bonusPoints: 4 }
        : { value: 9, bonusPoints: 0 };

    case "Blackjack Buster": {
  const targetName = opponentCard?.name?.trim();
  const targetVal = opponentResolvedValue ?? opponentCard?.value;

  const busterTargets = [
    "10 of Might",
    "Queen’s Wrath",
    "The King",
    "Comeback Jack",
    "Crowned Victor",
  ];

  const beatsThisCard = busterTargets.includes(targetName);

  if (beatsThisCard) {
    return { value: 14, bonusPoints: 3 };
  }

  return { value: 0, bonusPoints: 0 };
}



    default:
      return { value: card.value, bonusPoints: 0 };
  }
}
