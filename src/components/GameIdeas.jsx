import React from "react";
import { Link } from "react-router-dom";

const GameIdeas = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-10 text-white space-y-6 from-black via-gray-900 to-black min-h-screen">
<div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-black/40 border border-white/10 shadow-2xl text-center animate-fade-in">
  <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
    🎮 stackedodds.net
  </h1>
  <p className="mt-2 text-white/60 text-lg">Explore all the ways to play and win!</p>
  <Link to="/home">
  <button className="mt-5 px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
    ▶️ Play Now
  </button>
</Link>


  <p className="mt-2 text-pink-400 text-lg font-semibold">
  Follow us on Instagram{" "}
  <a
    href="https://instagram.com/stackedodds_net"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-pink-600"
  >
    @stackedodds_net
  </a>{" "}
  for the latest updates!
</p>

</div>


      {/* Content Sections */}
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {sections.map(({ title, icon, borderColor, color, description, list }) => (
          <div
            key={title}
            className={`w-full p-5 rounded-xl bg-black/30 border ${borderColor} transition-transform duration-200 hover:scale-[1.02] shadow-md backdrop-blur-sm`}
          >
            <h2 className={`text-2xl font-bold mb-2 ${color}`}>{icon} {title}</h2>
            <p className="text-white/90">{description}</p>
            {list && (
              <ul className="list-disc list-inside pl-4 mt-2 text-white/80 space-y-1">
                {list.map((item, idx) =>
                  typeof item === "string" ? (
                    <li key={idx}>{item}</li>
                  ) : (
                    <li key={idx}>
                      <strong>{item.label}</strong>
                      <ul className="list-disc list-inside pl-6 text-white/70 mt-1 space-y-1">
                        {item.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-white/60 animate-fade-in-down">
        🚧 More features on the way... got an idea? Let us know!
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Level Up",
    icon: "📈",
    borderColor: "border-yellow-300/30",
    color: "text-yellow-300",
    description: "Open cases, spin wheels, and now spin slots to gain XP and level up! Each rarity gives a different XP boost:",
    list: [
      "Common = +5 XP",
      "Rare = +10 XP",
      "Epic = +25 XP",
      "Legendary = +250 XP",
      "Mythic = +1000 XP",
      "Slots:",
      "Classic = +25 XP",
      "High Roller = +100 XP",
      "Triple Crown = +250 XP"
    ]
  },
  {
    title: "Blackjack",
    icon: "♠️",
    borderColor: "border-blue-400/30",
    color: "text-blue-300",
    description: "Test your luck and skills in Blackjack! Bet up to $25,000 per round and play against the dealer — hit, stand, and try not to bust."
  },
  {
    title: "Daily Grid",
    icon: "🧨",
    borderColor: "border-red-400/30",
    color: "text-red-400",
    description: "Play the 5x5 bomb grid every day for a shot at free money, opals and maybe even an avatar! Just don’t get greedy, there is one bomb per grid."
  },
  {
  title: "Tempt Lady Fate",
  icon: "🃏",
  borderColor: "border-pink-400/30",
  color: "text-pink-300",
  description: "Build your deck, collect powerful cards, and outwit your opponent in this high-stakes card duel. From drawing fate to claiming victory, every choice matters.",
  list: [
    {
      label: "Deck Building:",
      details: [
        "Main Deck: Choose 18 cards from your collection. Basic numbered cards, face cards, and aces.",
        "Power Cards (5 max): Special cards like 'Ten of Might' or 'Risky Joker' with unique effects.",
        "Choice Cards (3 max): Strategic options you can play instead of drawing. Examples: 'Desperation Draw', 'Heart Breaker'."
      ]
    },
    {
      label: "Packs & Rarity:",
      details: [
        "Open Fate Packs in the shop using Opals.",
        "Cards come in rarity tiers: Basic, Sturdy, Noble, Mythic, and special Power/Choice types.",
        "Duplicates are converted into bonus Opals."
      ]
    },
    {
      label: "Gameplay Overview:",
      details: [
        "Play 8 rounds against an opponent. Each player draws or plays a choice card per round.",
        "Winner of each round gains 1 point (or more with special effects). Highest score after 8 rounds wins.",
      ]
    },
    {
      label: "Ladies Currency:",
      details: [
        "Win a match to earn +3 to +7 💃 Ladies.",
        "Lose a match and you’ll lose -3 to -7 Ladies.",
        "Your total Ladies are shown only at the match end screen and tracked on the leaderboard."
      ]
    },
    {
      label: "Card Checker:",
      details: [
        "Use the in-game Fate Card Checker to preview how any two cards would resolve.",
        "Supports power vs power, power vs choice, and full match logic matching in-game results.",
        "Great for learning card interactions and testing strategy."
      ]
    }
  ]
},
  {
    title: "Slot Machines",
    icon: "🎰",
    borderColor: "border-green-400/30",
    color: "text-green-400",
    description: "Try your luck on three unique slot machines, each with its own special payouts:",
    list: [
      {
        label: "General Rules:",
        details: [
          "No matching = no payout",
          "Two matching = 2x your bet",
          "Three matching = 5x your bet"
        ]
      },
      "Opal Classic: Three 🍒 Pay 10x your bet.",
      "High Roller: Three 💎 Pay 10x your bet.",
      "Triple Crown: Three 👑 Pay 10x your bet."
    ]
  },
  {
    title: "Horse Racing",
    icon: "🐎",
    borderColor: "border-orange-400/30",
    color: "text-orange-400",
    description: "Pick a horse, place your bet, and watch the race unfold! Odds are shown on each button, and each horse runs at a unique pace. Win and earn opals — plus achievements over time. Betting up to $25,000!"
  },
  {
    title: "Inventory & Sets",
    icon: "📦",
    borderColor: "border-purple-400/30",
    color: "text-purple-400",
    description: "Hang onto your rewards from cases and wheels — store them in your inventory and use them to complete sets. Turn sets in for big Opal rewards and show off your collection."
  },
  {
    title: "Achievements",
    icon: "🏆",
    borderColor: "border-indigo-400/30",
    color: "text-indigo-400",
    description: "Earn achievements by reaching milestones across different game modes. Some are simple like spinning the wheel 10 times, while others take commitment like betting on 100 horse races or completing 25 sets. Each one you unlock is tracked silently and permanently."
  },
  {
    title: "Avatars & Workers",
    icon: "🧍🛠️",
    borderColor: "border-emerald-400/30",
    color: "text-emerald-400",
    description: "Customize your profile by equipping a unique avatar and selecting up to **four workers** to stand by your side. Workers generate passive income over time. You can assign and unassign workers anytime — but choose wisely!"
  },
  {
    title: "Pets",
    icon: "🐾",
    borderColor: "border-pink-300/30",
    color: "text-pink-300",
    description: "Collect adorable pets from the Pet Shop using opals. You can only have **one active pet** at a time — it will generate daily income for you. Each pet has its own unique flair and personality. Choose your favorite and earn while you play!"
  },
  {
    title: "Make Friends",
    icon: "👥",
    borderColor: "border-pink-400/30",
    color: "text-pink-400",
    description: "Search up players on the leaderboard, click their profile, and hit Add Friend. Once you're connected, you can send messages and build your squad."
  }
  
];


export default GameIdeas;
