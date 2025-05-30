// HorseRace.jsx
import { useState } from "react";
import { generateHorses } from "../data/horses";

export default function HorseRace({
  balance,
  setBalance,
  saveUserData,
  horseRaces,
  setHorseRaces,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  blackjackWins,
  inventory,
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
  updatedHorseRaces,
  finalBalance
}) {


  const [horses, setHorses] = useState(generateHorses());
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [winner, setWinner] = useState(null);
  const [raceInProgress, setRaceInProgress] = useState(false);
  const [positions, setPositions] = useState(horses.map(() => 0));
  const [finished, setFinished] = useState(horses.map(() => false));
  const [raceTime, setRaceTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [finishTimes, setFinishTimes] = useState({});
  const [speeds, setSpeeds] = useState(horses.map(() => 0));
  const [elapsedTimes, setElapsedTimes] = useState(horses.map(() => 0));
  const [horseIntervals, setHorseIntervals] = useState([]);
const [betAmount, setBetAmount] = useState("1"); // default bet
const [raceCompleted, setRaceCompleted] = useState(false);




  const finishLinePx = 960;

  function getRaceOutcome(horses) {
    const entries = horses.map(h => ({
      ...h,
      ticketCount: Math.round(h.winChance * 100)
    }));

    const results = [];

    for (let place = 0; place < horses.length; place++) {
      const ticketPool = [];
      entries.forEach((horse, index) => {
        if (horse.ticketCount > 0) {
          for (let i = 0; i < horse.ticketCount; i++) {
            ticketPool.push(index);
          }
        }
      });

      const winnerIndex = ticketPool[Math.floor(Math.random() * ticketPool.length)];
      results.push(entries[winnerIndex].name);
      entries[winnerIndex].ticketCount = 0;
    }

    return results;
  }

  const startRace = () => {
    if (!selectedHorse || raceInProgress) return;

if (betAmount < 1 || betAmount > 25000) {
  alert("Please enter a valid bet between $1 and $25,000.");
  return;
}
if (balance < betAmount) {
  alert("Insufficient funds.");
  return;
}

setBalance(balance - betAmount);
saveUserData(balance - betAmount);

    if (!selectedHorse) return;
    setRaceInProgress(true);
    setWinner(null);
    setRaceTime(0);
    setFinishTimes({});
    const finishedFlags = horses.map(() => false);
    setFinished(finishedFlags);

    const outcome = getRaceOutcome(horses);
    const targetTimes = horses.map((_, i) => {
  const placeIndex = outcome.indexOf(horses[i].name);
  const avgSpeed = 2 + (horses.length - placeIndex) * 0.1;
  return finishLinePx / avgSpeed;
});

    setRankings(outcome);

    const startTimestamp = performance.now();

    const timeInterval = setInterval(() => {
      setRaceTime((prev) => prev + 0.1);
    }, 100);
    setTimerInterval(timeInterval);

    const newIntervals = [];

horses.forEach((horse, i) => {
  const placeIndex = outcome.indexOf(horse.name);
  const baseSpeed = 2;
  const speed = baseSpeed + (horses.length - placeIndex) * 0.1;

  // Each horse gets a unique jump interval between 400ms–600ms
const jumpInterval = 50 + Math.floor(Math.random() * 1501); // 300–800 ms

  const interval = setInterval(() => {
  setPositions(prev => {
    const updated = [...prev];
    const updatedFinished = [...finishedFlags];

    if (!updatedFinished[i]) {
      const currentPos = prev[i];
      const remaining = finishLinePx - currentPos;
      const jumpDistance = speed * (jumpInterval / 50);
const nextPos = currentPos + jumpDistance;

if (nextPos >= finishLinePx) {
  updated[i] = finishLinePx;
  updatedFinished[i] = true;

  // Force all horses to match exactly
  setTimeout(() => {
    setPositions(prev => {
      const finalPositions = [...prev];
      finalPositions[i] = finishLinePx;
      return finalPositions;
    });
  }, 0);


  const finishNow = performance.now();
  const seconds = ((finishNow - startTimestamp) / 1000).toFixed(1);

  setFinishTimes(prev => ({
    ...prev,
    [horses[i].name]: seconds,
  }));

  clearInterval(interval);

  if (updatedFinished.every(done => done)) {
    clearInterval(timeInterval);
    setTimerInterval(null);
    setRaceInProgress(false);
    finishRace(outcome[0]);
  }
} else {
  updated[i] = nextPos;
}

    }

    finishedFlags.splice(0, horses.length, ...updatedFinished);
    setFinished([...updatedFinished]);

    return updated;
  });
}, jumpInterval);


  newIntervals.push(interval);
});

setHorseIntervals(newIntervals);



  };

 const finishRace = (winnerName) => {
  setWinner(winnerName);
  setRaceInProgress(false);

  const winningHorse = horses.find(h => h.name === winnerName);
  if (selectedHorse.name === winnerName && winningHorse) {
    const winnings = Math.round(betAmount * ((1 / winningHorse.winChance) - 1));
    const newBalance = balance + winnings;

    setBalance(newBalance);
    saveUserData(newBalance, [], 0);
  }

  // ⬇️ Add this to increment horseRaces
  setHorseRaces(prev => {
    const updated = prev + 1;
saveUserData(
  finalBalance,
      inventory,
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
      blackjackWins,
      updatedHorseRaces
    );
    return updated;
  });

  setRaceCompleted(true);
};


  const resetRace = () => {
    if (timerInterval) {
horseIntervals.forEach(clearInterval);
setHorseIntervals([]);    }
    


    const newHorses = generateHorses();
    setHorses(newHorses);
    setPositions(newHorses.map(() => 0));
    setFinished(newHorses.map(() => false));
    setSelectedHorse(null);
    setWinner(null);
    setRaceInProgress(false);
    setRaceTime(0);
    setTimerInterval(null);
    setRankings([]);
    setFinishTimes({});
    setRaceCompleted(false);

  };

  return (
<div className="px-4 pt-6 text-white max-w-2xl mx-auto space-y-6">
<h2 className="text-3xl font-bold text-center relative left-[-120px] sm:left-0">🐎 Horse Race</h2>


<div className="transform scale-[0.65] sm:scale-100 origin-top">
<div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-start sm:justify-center w-full">
    {/* Left column: race buttons and betting */}
    <div className="flex flex-col gap-4 w-full max-w-xs sm:w-[180px]">
      <button
        onClick={startRace}
        disabled={
          !selectedHorse ||
          raceInProgress ||
          betAmount < 1 ||
          betAmount > 25000 ||
          balance < Number(betAmount) ||
          raceCompleted
        }
        className={`neon-spin-btn ${
          !selectedHorse ||
          raceInProgress ||
          betAmount < 1 ||
          betAmount > 25000 ||
          balance < Number(betAmount) ||
          raceCompleted
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {raceInProgress ? "Racing..." : "Start Race"}
      </button>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Bet Amount (Max = $25,000):</label>
        <input
          type="number"
          value={betAmount}
          min={1}
          max={25000}
          disabled={raceInProgress}
          onChange={(e) => setBetAmount(e.target.value)}
          className="neon-input px-3 py-1.5 text-sm text-white bg-black border border-pink-300 rounded-md shadow-md placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-32"
        />
      </div>

      {!raceInProgress && winner && (
        <button
          onClick={resetRace}
          className="bg-purple-600 text-white text-sm font-bold py-2 rounded hover:bg-purple-700"
        >
          🔁 New Race
        </button>
      )}
    </div>

    {/* Middle: horse selection buttons */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-fit sm:w-[360px]">
      {horses.map((horse, i) => (
        <button
          key={i}
          onClick={() => !raceInProgress && setSelectedHorse(horse)}
className={`glow-btn text-left !rounded-md px-4 py-2 sm:px-2 sm:py-1 text-base sm:text-sm ${
  selectedHorse?.name === horse.name ? "glow-core" : ""
}`}

        >
<img src={horse.img} alt={horse.name} className="h-10 sm:h-8 w-auto" />
          <span className="flex flex-col items-start leading-tight">
            <span className="font-semibold">
              {horse.name} ({Math.round(horse.winChance * 100)}%)
            </span>
            <span className="text-xs text-green-300">
              ${Math.round(betAmount * (1 / horse.winChance)).toLocaleString()} payout
            </span>
          </span>
        </button>
      ))}
    </div>

    {/* Right column: timer and leaderboard */}
    <div className="flex flex-col gap-4 w-full max-w-xs sm:w-[220px]">
      {(raceInProgress || raceTime > 0) && (
        <div className="text-md font-mono text-pink-300 neon-pulse bg-dark-oval px-3 py-1 rounded-full shadow-md text-center">
          ⏱️ {raceTime.toFixed(1)}s
        </div>
      )}

      {rankings.length > 0 && (
        <div className="p-3 rounded-lg border border-pink-300 shadow-lg animate-fade-in-fast w-full">
          <h3 className="text-xl font-bold text-pink-300 mb-2 text-center">🏁 Results</h3>
          <ol className="space-y-2 text-sm">
            {rankings.map((name, i) =>
              finishTimes[name] ? (
                <li
                  key={i}
                  className={`transition-opacity duration-500 opacity-100 px-2 py-1 rounded flex justify-between items-center text-white ${
                    i === 0
                      ? "rank-gold"
                      : i === 1
                      ? "rank-silver"
                      : i === 2
                      ? "rank-bronze"
                      : "bg-gray-800"
                  }`}
                >
                  <span>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏅"} {name}
                  </span>
                  <span>{finishTimes[name]}s</span>
                </li>
              ) : null
            )}
          </ol>
        </div>
      )}
    </div>
  </div>
</div>



{/* Horizontally scrollable on mobile only */}
<div className="w-full overflow-x-auto sm:overflow-x-visible">
  <div className="flex flex-col items-center space-y-4 mt-4 min-w-[1250px] sm:min-w-0">
    {horses.map((horse, i) => (
      <div
        key={i}
        className="relative h-20 w-[1250px] bg-neon-pattern track-lane rounded overflow-hidden border border-white/20"
      >
        <div
          className="finish-line"
          style={{ left: `${finishLinePx + 50}px` }}
        ></div>

        <div
          className="absolute top-1/2 px-2 transition-all duration-75 z-20"
          style={{
            transform: `translateX(${positions[i]}px) translateY(-50%)`,
          }}
        >
          <img
            src={horse.img}
            alt={horse.name}
            className="h-16 w-auto drop-shadow-glow"
          />
        </div>
      </div>
    ))}
  </div>
</div>


      
    </div>
  );
}