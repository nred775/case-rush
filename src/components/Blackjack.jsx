import React, { useState, useEffect } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

const getHandValue = (hand) => {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    if (["J", "Q", "K"].includes(card.value)) {
      total += 10;
    } else if (card.value === "A") {
      total += 11;
      aces++;
    } else {
      total += parseInt(card.value);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
};

const suitIcons = {
  "♠": "♠️",
  "♥": "♥️",
  "♦": "♦️",
  "♣": "♣️",
};


const Blackjack = ({
  balance,
  setBalance,
  saveUserData,
  blackjackWins,
  setBlackjackWins,
  opals,
  ownedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  xp,
  level,
  claimedRewards,
  userBadges,
  topBarButtons,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  horseRaces,
  slotsSpun
}) => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(1); // default bet
  const [dealtCount, setDealtCount] = useState(0);
const [revealDealerCard, setRevealDealerCard] = useState(false);
const [showDealerTotal, setShowDealerTotal] = useState(false);
const [showEndButtons, setShowEndButtons] = useState(false);
const [holdTimeout, setHoldTimeout] = useState(null);
const [holdInterval, setHoldInterval] = useState(null);
const [displayedHandValue, setDisplayedHandValue] = useState(0);


const startHold = (direction) => {
  const adjust = () => {
    setBet((prev) => {
      const next = direction === "up" ? prev + 1 : prev - 1;
      return Math.min(Math.max(next, 1), 25000);
    });
  };

  adjust(); // do one instantly
  const timeout = setTimeout(() => {
    const interval = setInterval(adjust, 60);
    setHoldInterval(interval);
  }, 300);

  setHoldTimeout(timeout);
};

const stopHold = () => {
  clearTimeout(holdTimeout);
  clearInterval(holdInterval);
};




  const startGame = () => {
  const newDeck = getDeck();
  const playerCard1 = newDeck.pop();
const dealerCard1 = newDeck.pop();
const playerCard2 = newDeck.pop();
const dealerCard2 = { ...newDeck.pop(), hidden: true };

const sequence = [
  () => {
    setPlayerHand([playerCard1]);
    setTimeout(() => setDisplayedHandValue(getHandValue([playerCard1])), 800);
  },
  () => setDealerHand([dealerCard1]),
  () => {
    const fullPlayerHand = [playerCard1, playerCard2];
    setPlayerHand(fullPlayerHand);
    setTimeout(() => setDisplayedHandValue(getHandValue(fullPlayerHand)), 1600);
  },
  () => setDealerHand([dealerCard1, dealerCard2]),
];




  setDeck(newDeck);
  setPlayerHand([]);
  setDisplayedHandValue(0);
  setDealerHand([]);
  setGameOver(false);
  setMessage("");
  setRevealDealerCard(false);
  setShowDealerTotal(false);
setBalance((prev) => prev - bet);
saveUserData(balance - bet, []);
setShowEndButtons(false); // 💥 reset button delay


  sequence.forEach((fn, i) => {
    setTimeout(() => {
      fn();
      setDealtCount(i + 1);
    }, i * 800);
  });
};


  const hit = () => {
  if (gameOver) return;

  const newDeck = [...deck];
  const newPlayerHand = [...playerHand, newDeck.pop()];
  const playerTotal = getHandValue(newPlayerHand);

  setDeck(newDeck);
  setPlayerHand(newPlayerHand);

  // delay hand value update for display
  setTimeout(() => {
    setDisplayedHandValue(getHandValue(newPlayerHand));
  }, 800); // adjust delay as needed

  if (playerTotal > 21) {
  setGameOver(true);

  // Delay flipping the facedown dealer card
  setTimeout(() => {
    setRevealDealerCard(true);

    // After card is flipped, show dealer total + message
    setTimeout(() => {
      setShowDealerTotal(true);
      setMessage("💥 You busted!");

      // Extra delay before showing buttons
      setTimeout(() => {
        setShowEndButtons(true);
      }, 1200); // wait longer after message
    }, 1000);
  }, 800);
}



};


const stand = async () => {
    if (gameOver) return;

      setRevealDealerCard(true); // 💥 flip that facedown card


    // Reveal the hidden dealer card before continuing
let newDealerHand = dealerHand.map((card) =>
  card.hidden ? { ...card, hidden: false } : card
);

// Continue hitting as needed
let i = 0;
while (getHandValue(newDealerHand) < 17) {
  const nextCard = deck.pop();
  newDealerHand.push(nextCard);
  await new Promise((res) => setTimeout(res, 800)); // slow down each draw
  i++;
}



    const playerTotal = getHandValue(playerHand);
    const dealerTotal = getHandValue(newDealerHand);

    let result = "";
    

    setDealerHand(newDealerHand);
setGameOver(true);
setRevealDealerCard(true); // flip the card

setTimeout(() => {
  setShowDealerTotal(true);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
  const newBalance = balance + bet * 2;
  let newWins = blackjackWins;

  // Only track a "21" win for the achievement
  if (playerTotal === 21) {
    newWins += 1;
    setBlackjackWins(newWins);
  }

  setMessage("🎉 You win!");
  setBalance(newBalance);
  saveUserData(
  newBalance,
  [],             // inventory
  opals,
  ownedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  xp,
  level,
  claimedRewards,
  userBadges,
  topBarButtons,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  newWins,
  horseRaces,     // ✅ Add this
  slotsSpun       // ✅ And this
);



  } else if (dealerTotal === playerTotal) {
    setMessage("🤝 It's a tie!");
    setBalance((prev) => {
      const newBalance = prev + bet;
      saveUserData(newBalance, []);
      return newBalance;
    });
  } else {
    setMessage("😓 You lose!");
  }

  // Extra delay before showing Play Again / Change Bet buttons
  setTimeout(() => {
    setShowEndButtons(true);
  }, 1200);
}, 1200);




  };

  return (
    <div className="text-white p-6 text-center">
<h2 className="text-3xl font-bold mb-4 text-purple-400 drop-shadow-glow animate-fade-in-fast bg-dark-oval">
  ♠️ Blackjack
</h2>

      {playerHand.length === 0 ? (
  <>
    <div className="mb-6 animate-fade-in-fast">
  <label className="block text-lg font-semibold mb-2 text-purple-300 drop-shadow-glow">
    💰 Enter Your Bet (1 – 25,000)
  </label>
  <div className="relative w-full">
  <div className="relative w-full">
  <input
    type="number"
    min={1}
    max={25000}
    value={bet}
    onChange={(e) => {
  const val = e.target.value;
  if (val === "") {
    setBet("");
    return;
  }
  const num = parseInt(val);
  if (!isNaN(num)) {
    setBet(num);
  }
}}

    className="neon-input w-full px-4 py-2 pr-10 rounded-full bg-dark-oval text-white border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 drop-shadow-glow text-center"
  />

  {/* Up/Down buttons */}
  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
  <button
    type="button"
    onMouseDown={() => startHold("up")}
    onMouseUp={stopHold}
    onMouseLeave={stopHold}
    onTouchStart={() => startHold("up")}
    onTouchEnd={stopHold}
    className="text-cyan-300 hover:text-cyan-400 text-xs select-none active:scale-110 transition"
  >
    ▲
  </button>
  <button
    type="button"
    onMouseDown={() => startHold("down")}
    onMouseUp={stopHold}
    onMouseLeave={stopHold}
    onTouchStart={() => startHold("down")}
    onTouchEnd={stopHold}
    className="text-cyan-300 hover:text-cyan-400 text-xs select-none active:scale-110 transition"
  >
    ▼
  </button>
</div>

</div>
</div>

</div>

<button
  onClick={startGame}
  disabled={bet < 1 || balance < bet || bet > 25000}

  className={`px-6 py-2 rounded-full text-lg font-semibold transition-transform drop-shadow-glow ${
    balance < bet || bet > 25000
      ? "bg-gray-600 cursor-not-allowed opacity-50"
      : "bg-dark-oval text-green-400 border-2 border-green-500 hover:bg-green-800"
  }`}
>
  🎲 Start Game
</button>


  </>
) : (
        <>
          <div className="mb-4">
<div className="mb-4">
  <h3 className="text-xl font-semibold mb-2 text-pink-400 drop-shadow-glow animate-fade-in-fast bg-dark-oval inline-block">
    Dealer Hand {dealerHand.length > 0 && showDealerTotal && `(${getHandValue(dealerHand)})`}
  </h3>

  <div className="flex justify-center gap-3">
    {dealerHand.map((card, i) => (
  <div
    key={i}
    className="relative w-28 h-40 sm:w-32 sm:h-48 perspective"
  >
    <div
      className={`w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
        card.hidden && !revealDealerCard ? "" : "rotate-y-180"
      }`}
    >
      {/* Back of card (shows when hidden) */}
      <div className="absolute inset-0 backface-hidden rounded-xl bg-gray-700 border-2 border-gray-500 shadow-inner" />

      {/* Front of card (shows when flipped) */}
      <div
        className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 shadow-md bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between p-2 font-serif ${
          card.suit === "♥" || card.suit === "♦"
            ? "text-pink-400 border-pink-500 shadow-[0_0_12px_rgba(244,114,182,0.6)]"
            : "text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        }`}
      >
        <div className="absolute top-1 left-2 text-xs sm:text-sm font-bold drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
          {card.value}
          <div>{card.suit}</div>
        </div>
        <div className="absolute bottom-1 right-2 text-xs sm:text-sm font-bold rotate-180 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
          {card.value}
          <div>{card.suit}</div>
        </div>
        <div className="flex-grow flex items-center justify-center text-3xl drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
          {card.suit}
        </div>
      </div>
    </div>
  </div>
))}



  </div>
</div>

<div className="mb-4">
  <h3 className="text-xl font-semibold mb-2 text-cyan-300 drop-shadow-glow animate-fade-in-fast bg-dark-oval inline-block">
Your Hand ({displayedHandValue})
  </h3>

  <div className="flex justify-center gap-3">
    {playerHand.map((card, i) => (
  <div
    key={i}
    className="relative w-28 h-40 sm:w-32 sm:h-48 perspective"
    style={{ animationDelay: `${i * 400}ms`, animationFillMode: "forwards" }}
  >
    <div className="w-full h-full rotate-y-180 transform-style-preserve-3d transition-transform duration-1000">
      {/* Back of card */}
      <div className="absolute inset-0 backface-hidden rounded-xl bg-gray-700 border-2 border-gray-500 shadow-inner" />

      {/* Front of card */}
      <div
        className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 shadow-md bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between p-2 font-serif ${
          card.suit === "♥" || card.suit === "♦"
            ? "text-pink-400 border-pink-500 shadow-[0_0_12px_rgba(244,114,182,0.6)]"
            : "text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        }`}
      >
        <div className="absolute top-1 left-2 text-xs sm:text-sm font-bold drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
          {card.value}
          <div>{card.suit}</div>
        </div>
        <div className="absolute bottom-1 right-2 text-xs sm:text-sm font-bold rotate-180 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
          {card.value}
          <div>{card.suit}</div>
        </div>
        <div className="flex-grow flex items-center justify-center text-3xl drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
          {card.suit}
        </div>
      </div>
    </div>
  </div>
))}

  </div>


  </div>

  {!gameOver && (
    <div className="flex justify-center gap-6 mt-6 animate-fade-in-fast">
  <button
    onClick={hit}
    className="bg-dark-oval text-blue-400 border-2 border-blue-500 rounded-full px-6 py-2 font-semibold hover:bg-blue-800 transition duration-200 drop-shadow-glow"
  >
    ➕ Hit
  </button>
  <button
    onClick={stand}
    className="bg-dark-oval text-yellow-300 border-2 border-yellow-400 rounded-full px-6 py-2 font-semibold hover:bg-yellow-600 transition duration-200 drop-shadow-glow"
  >
    ✋ Stand
  </button>
</div>

  )}
</div>





{message && (
  <p className="mt-4 text-2xl font-bold animate-fade-in-fast drop-shadow-glow text-yellow-300 bg-dark-oval inline-block">
    {message}
  </p>
)}

          {gameOver && showEndButtons && (
  <div className="mt-6 flex justify-center gap-6 animate-fade-in-fast">
    <button
  onClick={startGame}
  disabled={balance < bet}
  className={`px-6 py-2 rounded-full text-lg font-semibold transition-transform drop-shadow-glow ${
    balance < bet
      ? "bg-gray-600 cursor-not-allowed opacity-50"
      : "bg-dark-oval text-green-400 border-2 border-green-500 hover:bg-green-800"
  }`}
>
  🔁 Play Again
</button>

    <button
      onClick={() => {
        setPlayerHand([]);
        setDealerHand([]);
        setMessage("");
        setGameOver(false);
        setShowEndButtons(false);
      }}
      className="bg-dark-oval text-yellow-300 border-2 border-yellow-400 rounded-full px-6 py-2 font-semibold hover:bg-yellow-600 transition duration-200 drop-shadow-glow"
    >
      💰 Change Bet
    </button>
  </div>
)}


        </>
      )}
    </div>
  );
};

export default Blackjack;
