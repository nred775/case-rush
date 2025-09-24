import React, { useEffect, useMemo, useState } from "react";

/**
 * Casino-style Blackjack with:
 * - Split (one split max; tens can split with any 10-value; special rules for A,A)
 * - Double Down (initial two cards, also after split except split aces)
 * - Insurance (offered when dealer shows an Ace)
 * - Late Surrender (only on first decision, before any hit/double/split)
 * - Natural blackjack pays 3:2 (only on original, unsplit two-card 21)
 * - Dealer stands on all 17 (S17). Adjust H17 by changing SHOULD_HIT_SOFT_17.
 *
 * Drop-in replacement for your previous Blackjack.jsx.
 */

// ====== Tunables ======
const SHOULD_HIT_SOFT_17 = false; // set true if you want dealer to hit soft 17

// ====== Cards / Helpers ======
const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const freshDeck = () => {
  const deck = [];
  for (const s of suits) for (const v of values) deck.push({ suit: s, value: v });
  // shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const isTenValue = (v) => v === "10" || v === "J" || v === "Q" || v === "K";

const cardPoints = (v) => (v === "A" ? 11 : isTenValue(v) ? 10 : parseInt(v, 10));

const handValue = (hand) => {
  let total = 0;
  let aces = 0;
  for (const c of hand) {
    if (c.value === "A") aces++;
    total += cardPoints(c.value);
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
};

const isSoft = (hand) => {
  // soft = counts an Ace as 11 without busting
  let total = 0;
  let aces = 0;
  for (const c of hand) {
    if (c.value === "A") aces++;
    total += cardPoints(c.value);
  }
  // if any ace can be 11 (i.e., reduce 10 for some aces and still <=21)
  if (aces === 0) return false;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  // If after reductions we still have at least one Ace counted as 11
  return aces > 0; // remaining aces counted as 11
};

const isBlackjack = (hand) => hand.length === 2 && ((hand[0].value === "A" && isTenValue(hand[1].value)) || (hand[1].value === "A" && isTenValue(hand[0].value)));

const canSplitPair = (hand) => {
  if (hand.length !== 2) return false;
  const [a, b] = hand;
  return a.value === b.value || (isTenValue(a.value) && isTenValue(b.value));
};

// ====== Component ======
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
  slotsSpun,
}) => {
  // shoe state
  const [deck, setDeck] = useState([]);

  // dealer
  const [dealerHand, setDealerHand] = useState([]); // dealerHand[1] may be {hidden:true}
  const [revealDealer, setRevealDealer] = useState(false);

  // player: support multi-hand (split)
  const [hands, setHands] = useState([]); // [{cards:[], bet:number, doubled:false, stood:false, result:null, isSplitAce:false, naturalBJ:false, surrendered:false}]
  const [active, setActive] = useState(0); // active hand index

  // round state
  const [bet, setBet] = useState(1);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showEndButtons, setShowEndButtons] = useState(false);
  const [lastDelta, setLastDelta] = useState(0);

  // options gating
  const [insuranceOffered, setInsuranceOffered] = useState(false);
  const [insuranceBet, setInsuranceBet] = useState(0);
  const [firstDecision, setFirstDecision] = useState(true); // resets per hand

  // ===== Helpers =====
  const persist = (newBal, newWins = blackjackWins) => {
    setBalance(newBal);
    try {
      saveUserData(
        newBal,
        [],
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
        horseRaces,
        slotsSpun
      );
    } catch (e) {
      // fallback to minimal signature if your saveUserData variant differs in some views
      try { saveUserData(newBal, []); } catch (_) {}
    }
  };

  const activeHand = hands[active];

  // Atomic balance delta helper (prevents stale balance issues)
  const persistDelta = (delta, winsDelta = 0) => {
    setBalance(prev => {
      const nb = prev + delta;
      try {
        // Minimal signature to avoid prop-mismatch across views
        saveUserData(nb, []);
      } catch (e) {
        try { saveUserData(nb); } catch (_) {}
      }
      return nb;
    });
    if (winsDelta) setBlackjackWins(prev => prev + winsDelta);
  };

  const dealerTotal = useMemo(() => handValue(dealerHand.map((c) => ({ ...c, hidden: false }))), [dealerHand]);

  // ====== Round flow ======
  const startGame = () => {
    if (bet < 1 || balance < bet) return;

    const d = freshDeck();

    // deal sequence
    const p1 = d.pop();
    const dlr1 = d.pop();
    const p2 = d.pop();
    const dlr2 = { ...d.pop(), hidden: true };

    const initialHand = [p1, p2];

    const first = {
      cards: initialHand,
      bet,
      doubled: false,
      stood: false,
      result: null,
      isSplitAce: false,
      naturalBJ: isBlackjack(initialHand),
      surrendered: false,
    };

    setDeck(d);
    setDealerHand([dlr1, dlr2]);
    setHands([first]);
    setActive(0);
    setRevealDealer(false);
    setMessage("");
    setGameOver(false);
    setShowEndButtons(false);
    setInsuranceOffered(dlr1.value === "A");
    setInsuranceBet(0);
    setFirstDecision(true);

    // take ante
    persist(balance - bet);
  };

  const canDouble = (h) => firstDecision && h.cards.length === 2 && !h.doubled && !h.isSplitAce;
  const canSplit = (h) => firstDecision && canSplitPair(h.cards) && hands.length === 1; // one split max
  const canSurrender = (h) => firstDecision && h.cards.length === 2 && !h.doubled && hands.length === 1;

  const endHandAndAdvance = () => {
    setHands((prev) => {
      const next = [...prev];
      next[active] = { ...next[active], stood: true };
      return next;
    });

    // move to next unresolved hand
    setTimeout(() => {
      const idx = hands.findIndex((h, i) => i > active && !h.stood && handValue(h.cards) <= 21 && !h.surrendered);
      if (idx !== -1) {
        setActive(idx);
        setFirstDecision(true);
      } else {
        // no next playable hand — resolve dealer then payouts
        resolveDealerThenPayouts();
      }
    }, 50);
  };

  const hit = () => {
    if (gameOver || !activeHand) return;
    setFirstDecision(false);

    setHands((prev) => {
      const next = [...prev];
      const h = { ...next[active] };
      const d = [...deck];
      h.cards = [...h.cards, d.pop()];
      next[active] = h;
      setDeck(d);

      // if bust or 21 -> auto-stand/advance
      const total = handValue(h.cards);
      if (total >= 21) {
        // 21 from >2 cards is not natural BJ; simply stand/advance
        setTimeout(endHandAndAdvance, 200);
      }
      return next;
    });
  };

  const stand = () => {
    if (gameOver || !activeHand) return;
    endHandAndAdvance();
  };

  const doubleDown = () => {
    if (gameOver || !activeHand || !canDouble(activeHand)) return;
    if (balance < activeHand.bet) return; // need additional equal bet

    // take additional bet
    persist(balance - activeHand.bet);

    // mark doubled and draw one, then stand
    setHands((prev) => {
      const next = [...prev];
      const h = { ...next[active] };
      const d = [...deck];
      const extra = d.pop();
      h.cards = [...h.cards, extra];
      h.doubled = true;
      h.bet = h.bet * 2; // total stake on hand
      next[active] = h;
      setDeck(d);
      return next;
    });

    setFirstDecision(false);
    setTimeout(endHandAndAdvance, 200);
  };

  const surrender = () => {
    if (gameOver || !activeHand || !canSurrender(activeHand)) return;
    // Mark surrendered; refund handled during final settlement to avoid race conditions
    setHands((prev) => {
      const next = [...prev];
      next[active] = { ...next[active], surrendered: true, stood: true };
      return next;
    });
    endHandAndAdvance();
  };

  const split = () => {
    if (gameOver || !activeHand || !canSplit(activeHand)) return;
    if (balance < bet) return; // need another equal bet for the new hand

    // charge for the second hand
    persist(balance - bet);

    setHands((prev) => {
      const d = [...deck];
      const [a, b] = activeHand.cards;

      const firstIsAcePair = a.value === "A" && b.value === "A";

      const hand1 = {
        cards: [a],
        bet,
        doubled: false,
        stood: false,
        result: null,
        isSplitAce: firstIsAcePair,
        naturalBJ: false, // split hands never count as blackjack
        surrendered: false,
      };
      const hand2 = { ...hand1, cards: [b] };

      // Deal one card to each immediately (standard practice)
      hand1.cards.push(d.pop());
      hand2.cards.push(d.pop());

      // If split aces: one card only and auto-stand both
      if (firstIsAcePair) {
        hand1.stood = true;
        hand2.stood = true;
      }

      setDeck(d);
      return [hand1, hand2];
    });

    // If aces, both are auto-resolved, go straight to dealer
    setTimeout(() => {
      if (activeHand.cards[0].value === "A") {
        resolveDealerThenPayouts();
      } else {
        // otherwise play first split hand
        setActive(0);
        setFirstDecision(true);
      }
    }, 50);
  };

  const takeInsurance = () => {
    if (!insuranceOffered || insuranceBet > 0 || balance < Math.floor(bet / 2)) return;
    const ins = Math.floor(bet / 2);
    setInsuranceBet(ins);
    persist(balance - ins);
  };

  const dealerShouldHit = (hand) => {
    const total = handValue(hand);
    if (total < 17) return true;
    if (total > 17) return false;
    // total === 17
    if (!SHOULD_HIT_SOFT_17) return false;
    return isSoft(hand);
  };

  const peekDealerBlackjack = () => {
    // Only meaningful before reveal
    const open = dealerHand[0];
    const hole = dealerHand[1];
    if (!hole) return false;
    const holeVal = hole.value;
    const upVal = open.value;
    // if upcard is Ace, dealer has BJ if hole is 10-value; if upcard is 10-value, dealer BJ if hole is Ace
    if (upVal === "A" && isTenValue(holeVal)) return true;
    if (isTenValue(upVal) && holeVal === "A") return true;
    return false;
  };

  const resolveDealerThenPayouts = async () => {
    // reveal dealer
    setRevealDealer(true);

    const dealerHasBJ = peekDealerBlackjack();

    // Dealer drawing
    let dHand = dealerHand.map((c) => ({ ...c, hidden: false }));
    if (!dealerHasBJ) {
      while (dealerShouldHit(dHand)) {
        await new Promise((r) => setTimeout(r, 350));
        const next = [...deck];
        dHand.push(next.pop());
        setDeck(next);
        setDealerHand([...dHand]);
      }
    } else {
      setDealerHand(dHand);
    }

    const dTotal = handValue(dHand);

    // ---- Single-pass settlement ----
    let delta = 0;
    let winsToAdd = 0;

    // Insurance
    if (insuranceBet > 0 && dealerHasBJ) {
      delta += insuranceBet * 3; // pays 2:1 + returns stake
    }

    const settled = hands.map((h) => {
      if (h.surrendered) {
        h.result = "surrender";
        // refund half of the total stake on that hand
        delta += Math.floor(h.bet / 2);
        return h;
      }

      const pTotal = handValue(h.cards);

      if (pTotal > 21) {
        h.result = "lose"; // doubled losses lose full stake; no refund
        return h;
      }

      if (dealerHasBJ) {
        if (h.naturalBJ) {
          h.result = "push";
          delta += h.bet; // return stake
        } else {
          h.result = "lose"; // full loss
        }
        return h;
      }

      if (h.naturalBJ) {
        h.result = "blackjack";
        delta += Math.floor(h.bet * 2.5);
        winsToAdd += 1;
        return h;
      }

      if (dTotal > 21 || pTotal > dTotal) {
        h.result = "win";
        delta += h.bet * 2;
      } else if (pTotal === dTotal) {
        h.result = "push";
        delta += h.bet;
      } else {
        h.result = "lose"; // full loss
      }
      return h;
    });

    // apply credits and wins atomically
    setLastDelta(delta);
    persistDelta(delta, winsToAdd);

    setHands(settled);

    const resultCounts = settled.reduce((acc, h) => {
      acc[h.result] = (acc[h.result] || 0) + 1;
      return acc;
    }, {});

    const parts = [];
    if (resultCounts.blackjack) parts.push(`🖤 ${resultCounts.blackjack} blackjack${resultCounts.blackjack > 1 ? "s" : ""}`);
    if (resultCounts.win) parts.push(`🎉 ${resultCounts.win} win${resultCounts.win > 1 ? "s" : ""}`);
    if (resultCounts.push) parts.push(`🤝 ${resultCounts.push} push${resultCounts.push > 1 ? "es" : ""}`);
    if (resultCounts.lose) parts.push(`😓 ${resultCounts.lose} loss${resultCounts.lose > 1 ? "es" : ""}`);
    if (resultCounts.surrender) parts.push(`🏳️ ${resultCounts.surrender} surrender`);

    setMessage(parts.join(" · "));
    setGameOver(true);
    setTimeout(() => setShowEndButtons(true), 600);
  };

  // ===== UI helpers =====
  const ActionButton = ({ onClick, disabled, children, className = "" }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-dark-oval border-2 rounded-full px-4 py-2 font-semibold drop-shadow-glow transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );

  const renderCard = (card, i, reveal = true) => (
    <div key={i} className="relative w-24 h-36 sm:w-28 sm:h-40 perspective">
      <div
        className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          !reveal && card.hidden && !revealDealer ? "" : "rotate-y-180"
        }`}
      >
        {/* back */}
        <div className="absolute inset-0 backface-hidden rounded-xl bg-gray-700 border-2 border-gray-500 shadow-inner" />
        {/* front */}
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
  );

  const renderPlayerHands = () => (
    <div className="flex flex-col gap-6">
      {hands.map((h, i) => {
        const total = handValue(h.cards);
        const highlight = i === active && !gameOver ? "border-yellow-400" : "border-transparent";
        return (
          <div key={i} className={`rounded-2xl p-3 border-2 ${highlight} bg-black/30`}> 
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-cyan-300 font-semibold">Your Hand {hands.length > 1 ? `#${i + 1}` : ""} ({total})</h4>
              <div className="text-sm text-purple-300">
                Bet: {h.bet.toLocaleString()} {h.doubled && <span className="ml-2 text-yellow-300">×2</span>} {h.surrendered && <span className="ml-2 text-yellow-300">(Surrendered)</span>}
              </div>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">{h.cards.map((c, idx) => renderCard(c, idx, true))}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="text-white p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-purple-400 drop-shadow-glow animate-fade-in-fast bg-dark-oval">♠️ Blackjack</h2>

      {/* Betting / start */}
      {hands.length === 0 ? (
        <>
          <div className="mb-6 animate-fade-in-fast">
            <label className="block text-lg font-semibold mb-2 text-purple-300 drop-shadow-glow">💰 Enter Your Bet (1 – 25,000)</label>
            <div className="relative w-full">
              <input
                type="number"
                min={1}
                max={25000}
                value={bet}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") return setBet("");
                  const num = parseInt(val, 10);
                  if (!Number.isNaN(num)) setBet(Math.max(1, Math.min(25000, num)));
                }}
                className="neon-input w-full px-4 py-2 pr-10 rounded-full bg-dark-oval text-white border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 drop-shadow-glow text-center"
              />
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
          {/* Dealer */}
          <div className="mb-6 animate-fade-in-fast">
            <h3 className="text-xl font-semibold mb-2 text-pink-400 drop-shadow-glow bg-dark-oval inline-block">
              Dealer Hand {revealDealer && `(${dealerTotal})`}
            </h3>
            <div className="flex justify-center gap-3">
              {dealerHand.map((c, i) => renderCard(c, i, false))}
            </div>
            {insuranceOffered && !revealDealer && (
              <div className="mt-3 text-sm text-yellow-300">
                Dealer shows an Ace. <strong>Insurance?</strong> (Costs half your bet; pays 2:1 if dealer has blackjack.)
                <div className="mt-2 flex justify-center gap-3">
                  <ActionButton onClick={takeInsurance} disabled={insuranceBet > 0 || balance < Math.floor(bet / 2)} className="text-yellow-300 border-yellow-400 hover:bg-yellow-700">🛡️ Take Insurance</ActionButton>
                  {insuranceBet > 0 && <span className="text-cyan-300">Taken: {insuranceBet.toLocaleString()}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Player hands */}
          {renderPlayerHands()}

          {/* Actions */}
          {!gameOver && activeHand && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-fade-in-fast">
              <ActionButton onClick={hit} className="text-blue-400 border-blue-500 hover:bg-blue-900">➕ Hit</ActionButton>
              <ActionButton onClick={stand} className="text-yellow-300 border-yellow-400 hover:bg-yellow-700">✋ Stand</ActionButton>
              <ActionButton onClick={doubleDown} disabled={!canDouble(activeHand) || balance < activeHand.bet} className="text-green-400 border-green-500 hover:bg-green-900">2️⃣ Double</ActionButton>
              <ActionButton onClick={split} disabled={!canSplit(activeHand) || balance < bet} className="text-pink-300 border-pink-500 hover:bg-pink-900">🪓 Split</ActionButton>
            </div>
          )}

          {/* Results */}
          {message && (
            <p className="mt-4 text-2xl font-bold animate-fade-in-fast drop-shadow-glow text-yellow-300 bg-dark-oval inline-block px-3 py-1">{message}</p>
          )}

          {gameOver && (
            <div className="mt-2 text-sm text-cyan-300">Round net: {lastDelta >= 0 ? "+" : ""}{lastDelta.toLocaleString()}</div>
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
                  setHands([]);
                  setDealerHand([]);
                  setMessage("");
                  setGameOver(false);
                  setShowEndButtons(false);
                  setRevealDealer(false);
                  setInsuranceOffered(false);
                  setInsuranceBet(0);
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
