import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue, set, update, get, onDisconnect, off, remove } from "firebase/database";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { rtdb, db } from "../firebase";
import RegularCard from "../utils/RegularCard";
import { resolvePowerCard } from "../utils/powerCardLogic";
import { resolveChoiceCard } from "../utils/choiceCardLogic";
import CardShuffleDeck from "../utils/CardShuffleDeck";




export default function FateMatchRoom({ user, setIsUILocked }) {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [playerRole, setPlayerRole] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [opponentProfile, setOpponentProfile] = useState(null);
  const navigate = useNavigate();
  const [playerLoadout, setPlayerLoadout] = useState(null);
const [opponentLoadout, setOpponentLoadout] = useState(null);
const [playerCard, setPlayerCard] = useState(null);
const [opponentCard, setOpponentCard] = useState(null);
const [roundWinner, setRoundWinner] = useState(null);
const [readyNext, setReadyNext] = useState(false);
const [opponentReadyNext, setOpponentReadyNext] = useState(false);
const [playerScore, setPlayerScore] = useState(0);
const [opponentScore, setOpponentScore] = useState(0);
const [roundNumber, setRoundNumber] = useState(1);
const [lastWinner, setLastWinner] = useState(null);
const [lastPlayerCard, setLastPlayerCard] = useState(null);
const [lastOpponentCard, setLastOpponentCard] = useState(null);
const [playerDiscardPile, setPlayerDiscardPile] = useState([]);
const [opponentDiscardPile, setOpponentDiscardPile] = useState([]);
const [drawTurn, setDrawTurn] = useState("player1");
const [usedChoiceCards, setUsedChoiceCards] = useState([]);
const [playerShuffling, setPlayerShuffling] = useState(false);
const [opponentShuffling, setOpponentShuffling] = useState(false);
const [justDrewCard, setJustDrewCard] = useState(false);
const [opponentJustDrewCard, setOpponentJustDrewCard] = useState(false);
const [roundResolved, setRoundResolved] = useState(false);
const [gameOver, setGameOver] = useState(false);
const [postGameCountdown, setPostGameCountdown] = useState(5);
const [opponentUsedChoiceCards, setOpponentUsedChoiceCards] = useState([]);
const [ladiesChange, setLadiesChange] = useState(null);
const [rewardedLadies, setRewardedLadies] = useState(false);
const [opponentCardRevealed, setOpponentCardRevealed] = useState(false);
const [opponentAlreadyHandledDrawStart, setOpponentAlreadyHandledDrawStart] = useState(false);
const [canPlayChoiceCards, setCanPlayChoiceCards] = useState(false);

const lastOpponentCardRef = useRef(null);
const hasHandledOpponentDrawStart = useRef(false);

const shouldShowOpponentDeck = useMemo(() => {
  return !opponentCard && !opponentJustDrewCard && !opponentShuffling && playerRole && room;
}, [opponentCard, opponentJustDrewCard, opponentShuffling, playerRole, room]);


const handlePlayerDraw = async () => {
  if (!playerLoadout || !playerRole || !room) return;
  setCanPlayChoiceCards(false); // 🔒 lock choice cards on draw


  // Begin shuffle animation
setPlayerShuffling(true);

// ✅ Notify other client to start opponent shuffle
await set(ref(rtdb, `temptRooms/${roomId}/${playerRole}DrawStarted`), true);

  // ⏳ Wait until the animation is visibly complete before revealing card
  setTimeout(async () => {
    setPlayerShuffling(false); // Done shuffling
    setJustDrewCard(true);     // Start flip animation

    const discardPile = playerDiscardPile.map(c => c.name + c.suit);
    const freshDeck = playerLoadout.equippedCards.filter(
      c => !discardPile.includes(c.name + c.suit)
    );



    // Randomly select card
    const drawn = freshDeck[Math.floor(Math.random() * freshDeck.length)];
    const playerPath = `temptRooms/${roomId}/${playerRole}Card`;

    // Save to RTDB
    await set(ref(rtdb, playerPath), drawn);


    // Handle turn switching if you're first drawer
    const isFirstDrawer = room.firstDrawer === playerRole;
    if (isFirstDrawer) {
      const nextTurn = playerRole === "player1" ? "player2" : "player1";
      await set(ref(rtdb, `temptRooms/${roomId}/drawTurn`), nextTurn);
    }

    // Reset flip animation after reveal duration
    setTimeout(() => setJustDrewCard(false), 600);
  }, 4450); // ⏱️ Delay long enough for full shuffle (2.4s anim + 1.5s stagger)
};
useEffect(() => {
  setIsUILocked(true);
  return () => setIsUILocked(false);
}, []);


const handlePlayChoiceCard = async (card) => {
  if (usedChoiceCards.includes(card.name)) return;

  const playerPath = `temptRooms/${roomId}/${playerRole}Card`;

  const resolved = resolveChoiceCard(card, {
  opponentCard: opponentCard ?? {},
  lastWinner,
  playerScore,
  opponentScore,
  lastPlayerCard,
  roundNumber,
});

console.log(`[CHOICE] ${card.name} resolved against ${opponentCard?.name} to`, resolved);


  const resultCard = { ...card, value: resolved.value, type: "choice" };

  // ✅ Trigger opponent flip (NO shuffle)
  await set(ref(rtdb, `temptRooms/${roomId}/${playerRole}DrawStarted`), "flipOnly");

  // ⏱ Tiny delay before setting card so flip starts cleanly
  setTimeout(async () => {
    await set(ref(rtdb, playerPath), resultCard);
  }, 150); // short delay for flipOnly signal to process

  setUsedChoiceCards((prev) => [...prev, card.name]);
  setCanPlayChoiceCards(false);

  const isFirstDrawer = room.firstDrawer === playerRole;
  if (isFirstDrawer) {
    const nextTurn = playerRole === "player1" ? "player2" : "player1";
    await set(ref(rtdb, `temptRooms/${roomId}/drawTurn`), nextTurn);
  }
};





const handleReadyNextRound = async () => {
  if (!roomId || !playerRole || !room) return;

  await update(ref(rtdb), {
    [`temptRooms/${roomId}/${playerRole}Ready`]: true,
  });

  setReadyNext(true);
};

useEffect(() => {
  if (!user || !roomId) return;

const roomRef = ref(rtdb, `temptRooms/${roomId}`);
const unsub = onValue(roomRef, (snap) => {
  const roomData = snap.val();
  if (!roomData) return;

  setRoom(roomData);
  if (roomData.roundNumber) setRoundNumber(roomData.roundNumber);

    if (roomData.gameOver && !gameOver) {
    setGameOver(true);
  }

if (roomData.drawTurn !== undefined) {
  setDrawTurn(roomData.drawTurn);
}


  if (roomData.player1?.uid === user.uid) {
    setPlayerRole("player1");
  } else if (roomData.player2?.uid === user.uid) {
    setPlayerRole("player2");
  }

  if (roomData.player1 && roomData.player2 && countdown === null) {
    setCountdown(5);
      setCanPlayChoiceCards(true); // ✅ unlock choice cards at round 1 start

  }

    // 🔁 Sync scores
   // 🔁 Sync scores (but wait until playerRole is definitely set)
  const role = roomData.player1?.uid === user.uid ? "player1" : "player2";

  if (role === "player1") {
    setPlayerScore(roomData.player1Score ?? 0);
    setOpponentScore(roomData.player2Score ?? 0);
  } else if (role === "player2") {
    setPlayerScore(roomData.player2Score ?? 0);
    setOpponentScore(roomData.player1Score ?? 0);
  }


    setOpponentReadyNext(
      roomData[playerRole === "player1" ? "player2Ready" : "player1Ready"] || false
    );
  });

  const cardsRef = ref(rtdb, `temptRooms/${roomId}`);
  const cardUnsub = onValue(cardsRef, async (snap) => {

    const data = snap.val();
    if (!data) return;

const drawStartedFlag =
  playerRole === "player1" ? data?.player2DrawStarted : data?.player1DrawStarted;


    const isPlayer1 = playerRole === "player1";
    const myCard = isPlayer1 ? data.player1Card : data.player2Card;
    const oppCard = isPlayer1 ? data.player2Card : data.player1Card;
    // 🧠 If opponent plays a choice card, track it
if (oppCard?.type === "choice") {
  setOpponentUsedChoiceCards((prev) =>
    prev.includes(oppCard.name) ? prev : [...prev, oppCard.name]
  );
}



    if (myCard) setPlayerCard(myCard);
    if (oppCard) setOpponentCard(oppCard);
    // Detect new opponent draw by comparing to last known card
const lastCard = lastOpponentCardRef.current;
const newDrawHappened = oppCard && (!lastCard || oppCard.name !== lastCard.name || oppCard.suit !== lastCard.suit);




lastOpponentCardRef.current = oppCard;




    if (
  myCard &&
  oppCard &&
  roundWinner === null &&
  !roundResolved
)

 {

let resolvedPlayerCard = myCard;
let resolvedOpponentCard = oppCard;
let extraPointsPlayer = 0;
let extraPointsOpponent = 0;

let playerResult, opponentResult;

if (myCard.value === 16) {
  playerResult = resolvePowerCard(myCard, {
    opponentCard: oppCard,
    lastWinner,
    playerScore,
    opponentScore,
  });
}

if (oppCard.value === 16) {
  opponentResult = resolvePowerCard(oppCard, {
    opponentCard: myCard,
    lastWinner: lastWinner === "player" ? "opponent" : lastWinner,
    playerScore: opponentScore,
    opponentScore: playerScore,
  });
}

// Re-resolve with full context if both are power cards
if (myCard.value === 16 && oppCard.value === 16) {
  playerResult = resolvePowerCard(myCard, {
    opponentCard: oppCard,
    opponentResolvedValue: opponentResult?.value,
    lastWinner,
    playerScore,
    opponentScore,
  });

  opponentResult = resolvePowerCard(oppCard, {
    opponentCard: myCard,
    opponentResolvedValue: playerResult?.value,
    lastWinner: lastWinner === "player" ? "opponent" : lastWinner,
    playerScore: opponentScore,
    opponentScore: playerScore,
  });
}

if (playerResult) {
  resolvedPlayerCard = { ...myCard, value: playerResult.value };
  extraPointsPlayer = playerResult.bonusPoints;
}

if (opponentResult) {
  resolvedOpponentCard = { ...oppCard, value: opponentResult.value };
  extraPointsOpponent = opponentResult.bonusPoints;
}





let winner;
if (resolvedPlayerCard.value > resolvedOpponentCard.value) {
  winner = "player";
} else if (resolvedPlayerCard.value < resolvedOpponentCard.value) {
  winner = "opponent";
} else {
  winner = "tie";
}




setTimeout(async () => {
  setRoundWinner(winner);
  setLastWinner(winner);
  setLastPlayerCard(myCard);
  setLastOpponentCard(oppCard);
  setRoundResolved(true); // ✅ prevent future executions

  if (winner === "player") {
    const updatedScore = playerScore + 1 + extraPointsPlayer;
    const scoreKey = playerRole === "player1" ? "player1Score" : "player2Score";
    await set(ref(rtdb, `temptRooms/${roomId}/${scoreKey}`), updatedScore);
  } else if (winner === "opponent") {
    const updatedScore = opponentScore + 1 + extraPointsOpponent;
    const scoreKey = playerRole === "player1" ? "player2Score" : "player1Score";
    await set(ref(rtdb, `temptRooms/${roomId}/${scoreKey}`), updatedScore);
  }
}, 1300);


    }
  });

  return () => {
    unsub();
    cardUnsub();
  };
}, [room, user, roomId, playerRole]);
useEffect(() => {
  if (!roomId || !playerRole) return;

  const key = playerRole === "player1" ? "player2DrawStarted" : "player1DrawStarted";
  const drawStartedRef = ref(rtdb, `temptRooms/${roomId}/${key}`);

  const unsub = onValue(drawStartedRef, (snap) => {
    const val = snap.val();
if (!val || hasHandledOpponentDrawStart.current) return;
if (!room || !playerRole) return;

hasHandledOpponentDrawStart.current = true;

const isFlipOnly = val === "flipOnly";

if (!isFlipOnly) {
  setOpponentShuffling(true);
}

setOpponentJustDrewCard(false);
setOpponentCardRevealed(false);

setTimeout(() => {
  setOpponentJustDrewCard(true);
  requestAnimationFrame(() => {
    setTimeout(() => {
      setOpponentCardRevealed(true);
    }, 100);
  });
}, isFlipOnly ? 50 : 200); // faster flip if not shuffled

if (!isFlipOnly) {
  setTimeout(() => setOpponentShuffling(false), 4450);
}

  });

  return () => off(drawStartedRef, "value", unsub);
}, [roomId, playerRole, room]);




useEffect(() => {
  if (!user || !roomId || !playerRole) return;

  const connectedRef = ref(rtdb, ".info/connected");

  const connectionListener = onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      const playerStatusRef = ref(rtdb, `status/${user.uid}`);
      const matchForfeitRef = ref(rtdb, `temptRooms/${roomId}`);

      // Set them online in RTDB
      set(playerStatusRef, true);

      // On disconnect: mark match as forfeited and ended
      onDisconnect(ref(rtdb, `temptRooms/${roomId}/forfeit`)).set(playerRole);
      onDisconnect(ref(rtdb, `temptRooms/${roomId}/gameOver`)).set(true);
    }
  });

  return () => {
    off(connectedRef, "value", connectionListener);
  };
}, [user, roomId, playerRole]);
const adjustLadies = async (isForfeitWin = false) => {
  if (rewardedLadies) return;
  setRewardedLadies(true);

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const currentLadies = userSnap.data().ladies || 0;
    const amount = Math.floor(Math.random() * 5) + 3;
    const wonMatch = isForfeitWin || playerScore > opponentScore;

    const newLadies = wonMatch
      ? currentLadies + amount
      : Math.max(0, currentLadies - amount);

    await updateDoc(userRef, { ladies: newLadies });
    setLadiesChange(wonMatch ? `+${amount} Ladies` : `-${amount} Ladies`);
  } catch (err) {
    console.error("Failed to update Ladies:", err);
  }
};



useEffect(() => {
  if (gameOver && countdown === 0) {
    let intervalId;

    intervalId = setInterval(() => {
      setPostGameCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);

          // Delete room and navigate — OUTSIDE of state update
          if (playerRole === "player1") {
            const roomRef = ref(rtdb, `temptRooms/${roomId}`);
            remove(roomRef)
              .then(() => {
                console.log("Room deleted after post-game countdown.");
                navigate("/home");
              })
              .catch((err) => {
                console.error("Failed to delete room:", err);
                navigate("/home"); // fail-safe
              });
          } else {
            navigate("/home");
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }
}, [gameOver, countdown, playerRole, roomId, navigate]);




useEffect(() => {
  if (readyNext && opponentReadyNext && room && roomId) {
    if (room.roundNumber >= 8) {
      setGameOver(true);
      return;
    }

    const newRound = (room.roundNumber || 1) + 1;
    setRoundNumber(newRound);

    // Reset UI state
    setCanPlayChoiceCards(true);
    setPlayerCard(null);
    setOpponentCard(null);
    setOpponentCardRevealed(false);
    setRoundWinner(null);
setReadyNext(false);
setOpponentReadyNext(false);
update(ref(rtdb), {
  [`temptRooms/${roomId}/player1Ready`]: null,
  [`temptRooms/${roomId}/player2Ready`]: null,
});

    setRoundResolved(false);
    hasHandledOpponentDrawStart.current = false;

    const nextDrawer = room.firstDrawer === "player1" ? "player2" : "player1";

    const updates = {
      [`temptRooms/${roomId}/roundNumber`]: newRound,
      [`temptRooms/${roomId}/player1Card`]: null,
      [`temptRooms/${roomId}/player2Card`]: null,
      [`temptRooms/${roomId}/player1Ready`]: null,
      [`temptRooms/${roomId}/player2Ready`]: null,
      [`temptRooms/${roomId}/drawTurn`]: nextDrawer,
      [`temptRooms/${roomId}/firstDrawer`]: nextDrawer,
      [`temptRooms/${roomId}/player1DrawStarted`]: null,
      [`temptRooms/${roomId}/player2DrawStarted`]: null,
    };

    update(ref(rtdb), updates);
  }
}, [readyNext, opponentReadyNext, room, roomId]);






  useEffect(() => {
    if (!room || !user) return;

    const opponentUid = room.player1?.uid === user.uid ? room.player2?.uid : room.player1?.uid;
    if (!opponentUid) return;

    const loadOpponentProfile = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", opponentUid));
        if (docSnap.exists()) {
          setOpponentProfile(docSnap.data());
        }
      } catch (err) {
        console.error("Error loading opponent profile:", err);
      }
    };

    loadOpponentProfile();
    loadFateLoadouts();

  }, [room, user]);



const loadFateLoadouts = async () => {
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const opponentUid = room.player1?.uid === user.uid ? room.player2?.uid : room.player1?.uid;
    const opponentDoc = opponentUid ? await getDoc(doc(db, "users", opponentUid)) : null;

    if (userDoc.exists()) {
  const data = userDoc.data();
  setPlayerLoadout({
  equippedCards: [
    ...(data.equippedFateCards || []),
    ...(data.equippedPowerCards || [])
  ],
    equippedChoiceCards: data.equippedChoiceCards || []

});
}

if (opponentDoc?.exists()) {
  const data = opponentDoc.data();
  setOpponentLoadout({
  equippedCards: [
    ...(data.equippedFateCards || []),
    ...(data.equippedPowerCards || [])
  ],
  equippedChoiceCards: data.equippedChoiceCards || [],
});

}

  } catch (err) {
    console.error("Error loading loadouts:", err);
  }
};

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

const handleQuitMatch = async () => {
  if (!roomId || !playerRole || !room) return;

  const updates = {
    [`temptRooms/${roomId}/forfeit`]: playerRole, // record who quit
    [`temptRooms/${roomId}/gameOver`]: true,
  };

  await update(ref(rtdb), updates);
  navigate("/home");
};



  if (!room || !playerRole) {
    return <div className="text-white p-6">Loading room...</div>;
  }

if (countdown === 0) {
  if (gameOver) {
        const isForfeitWin = room?.forfeit && room?.forfeit !== playerRole;
    if (!rewardedLadies) adjustLadies(isForfeitWin);


    return (
      <div className="text-white p-8 text-center flex flex-col items-center justify-center min-h-screen bg-opacity-80">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse">
          Match Complete!
        </h1>
{ladiesChange && (
  <div className="text-pink-400 text-xl font-bold mb-4">{ladiesChange}</div>
)}


        <p
          className={`text-3xl font-bold mb-4 ${
            room?.forfeit === playerRole
              ? "text-gray-400"
              : room?.forfeit
              ? "text-green-400"
              : playerScore > opponentScore
              ? "text-green-400"
              : playerScore < opponentScore
              ? "text-red-400"
              : "text-yellow-300"
          } drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
        >
          {room?.forfeit === playerRole
            ? "❌ You forfeited the match."
            : room?.forfeit
            ? "🏆 You win — opponent forfeited!"
            : playerScore > opponentScore
            ? "✅ You win the match!"
            : playerScore < opponentScore
            ? "❌ Opponent wins the match!"
            : "🤝 The match ends in a tie!"}
        </p>

        <div className="mb-6 mt-2 flex items-center gap-4 text-2xl font-bold px-6 py-3 bg-black/60 border border-white/10 rounded-2xl shadow-inner">
          <span className="text-green-300 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
            You {playerScore}
          </span>
          <span className="text-gray-400">vs</span>
          <span className="text-red-300 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]">
            {opponentScore} Opponent
          </span>
        </div>

        <p className="text-sm text-gray-400 mt-2 animate-pulse">
          Returning to home in{" "}
          <span className="text-white font-bold">{postGameCountdown}</span>...
        </p>
      </div>
    );
  }

  return (
    <div className="text-white p-6 flex flex-col items-center">
      {/* Quit Match Button */}
<button
  onClick={handleQuitMatch}
  className="mb-4 text-sm bg-gradient-to-r from-red-600 to-pink-500 px-3 py-1.5 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-red-400 transition-transform duration-200"
>
  ❌ Quit Match
</button>


      <div className="flex flex-col items-center mb-6">
  <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] tracking-wide">
    🌀 Round {roundNumber} of 8
  </div>

  <div className="mt-2 px-6 py-2 bg-black/40 border border-white/20 rounded-xl shadow-lg flex items-center gap-4 text-lg font-bold text-white tracking-wider">
    <span className="text-green-300 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
      {playerScore}
    </span>
    <span className="text-gray-400">to</span>
    <span className="text-red-300 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]">
      {opponentScore}
    </span>
  </div>
</div>


      {/* Opponent Section */}
      <div className="flex flex-col items-center mb-8">
<p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] tracking-wide mb-2">
  🟢 Opponent
</p>

        {/* Opponent Choice Cards Face-Down */}
        <div className="flex gap-2 mb-2">
          {opponentLoadout?.equippedChoiceCards
  ?.filter((card) => !opponentUsedChoiceCards.includes(card.name))
  .map((_, idx) => (
    <div
      key={idx}
      className="w-[104px] h-[156px] rounded-xl bg-gray-700 border border-gray-500"
    />
))}

        </div>

        {/* Opponent Deck or Card */}
        {opponentShuffling || shouldShowOpponentDeck ? (
  <CardShuffleDeck isShuffling={opponentShuffling} />
) : opponentCard ? (
  <div className={`transition-transform duration-500 ${opponentJustDrewCard ? "animate-flip" : ""}`}>
  <div className="relative w-[104px] h-[156px] perspective">
    <div
      className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
        opponentCardRevealed ? "rotate-y-180" : ""
      }`}
    >
      <div className="absolute inset-0 backface-hidden rounded-xl bg-gray-700 border border-gray-500 shadow-inner" />
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <RegularCard card={opponentCard} isSelected={false} />
      </div>
    </div>
  </div>
</div>

) : (
  <div className="w-[104px] h-[156px] bg-gray-700 border border-gray-500 rounded-xl" />
)}


      </div>

      <div className="w-full h-[2px] bg-gray-600 rounded mb-8" />

      {/* Player Section */}
      <div className="flex flex-col items-center">
        {!playerCard ? (
          <CardShuffleDeck isShuffling={playerShuffling} />
        ) : (
          <div
            className={`transition-transform duration-500 ${
              justDrewCard ? "animate-flip" : ""
            }`}
          >
            <div className="relative w-[104px] h-[156px] perspective">
              <div
                className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  playerCard && !justDrewCard ? "rotate-y-180" : ""
                }`}
              >
                <div className="absolute inset-0 backface-hidden rounded-xl bg-gray-700 border border-gray-500 shadow-inner" />
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <RegularCard card={playerCard} isSelected={false} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Player Choice Cards Face-Up */}
        <div className="flex gap-2 mt-2">
          {playerLoadout?.equippedChoiceCards
  ?.filter((card) => !usedChoiceCards.includes(card.name))
  .map((card, idx) => (
    <div key={idx} className={`${!canPlayChoiceCards ? "pointer-events-none opacity-50" : ""}`}>
      <RegularCard
        card={card}
        isSelected={false}
        onClick={() => canPlayChoiceCards && handlePlayChoiceCard(card)}
      />
    </div>
))}

        </div>

<p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-lime-400 to-green-500 drop-shadow-[0_0_6px_rgba(200,255,200,0.6)] tracking-wide mt-2">
  🟢 You
</p>
      </div>

      {/* Draw Button + Status */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        {drawTurn === playerRole && !playerCard ? (
          <button
  onClick={handlePlayerDraw}
  className="bg-gradient-to-r from-green-500 via-lime-400 to-green-500 px-6 py-3 text-black font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-green-400 transition-all duration-200"
>
  🔮 Draw Your Card
</button>

        ) : !playerCard ? (
          <p className="text-gray-400 text-sm italic">
            Waiting for your turn to draw...
          </p>
        ) : !opponentCard ? (
          <p className="text-gray-400 text-sm italic">
            Waiting for opponent to draw...
          </p>
        ) : null}
      </div>


      {/* Round Outcome + Ready Button */}
      <div className="mt-6 text-center">
        {roundWinner && (
  <p
    className={`text-3xl font-extrabold mt-4 ${
      roundWinner === "player"
        ? "text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
        : roundWinner === "opponent"
        ? "text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
        : "text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]"
    } animate-pulse`}
  >
    {roundWinner === "player"
      ? "✅ You Win"
      : roundWinner === "opponent"
      ? "❌ You Lose"
      : "🤝 It's a Tie"}
  </p>
)}


        {roundWinner && !readyNext && (
          <button
  onClick={handleReadyNextRound}
  className="mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-400 transition-all duration-200"
>
  ✅ Ready for Next Round
</button>

        )}

        {readyNext && !opponentReadyNext && (
<p className="mt-2 text-pink-400 font-bold animate-pulse drop-shadow-[0_0_6px_rgba(255,105,180,0.8)]">
  ⏳ Awaiting your rival...
</p>
        )}
        
      </div>
    </div>
  );
}




 return (
  <div className="min-h-screen text-white flex flex-col items-center justify-center px-6">
    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_16px_rgba(255,255,255,0.4)] animate-pulse text-center mb-10 tracking-wide">
      🕒 Preparing the Battle Arena...
    </h1>

    <div className="flex items-center justify-center space-x-12 mb-10">
      <div className="text-xl font-bold text-green-400 drop-shadow">🧙 {user.username || "You"}</div>
      <div className="text-4xl font-extrabold text-red-500 animate-pulse">VS</div>
      <div className="text-xl font-bold text-gray-300 drop-shadow">
        {opponentProfile?.username || "Summoning Opponent..."}
      </div>
    </div>

    {countdown !== null ? (
      <p className="text-yellow-300 text-xl font-semibold animate-pulse">
        Match begins in {countdown}...
      </p>
    ) : (
      <p className="text-gray-400 text-md animate-pulse">Waiting for both players to lock in...</p>
    )}
  </div>
);

}
