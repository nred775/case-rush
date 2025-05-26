import React from "react";

const GameIdeas = () => {
  return (
  <div className="w-full px-4 sm:px-8 py-6 text-white space-y-6">
    <div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-black/40 border border-white/10 shadow-lg text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
        stackedodds.net
      </h1>
      <p className="text-lg text-white/80 mt-2">
        feel free to stick with case-rush.vercel.app, but stackedodds.net just feels right 😁
      </p>
    </div>

    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Section: Level Up */}
      <div className="w-full p-5 rounded-xl bg-black/30 border border-yellow-300/30">
        <h2 className="text-2xl font-bold mb-2 text-yellow-300">📈 Level Up</h2>
        <p>Open crates and spin wheels to gain XP and level up! Each rarity gives a different XP boost:</p>
        <ul className="list-disc list-inside pl-4 mt-2 text-white/80">
          <li>Common = +1 XP</li>
          <li>Rare = +5 XP</li>
          <li>Epic = +10 XP</li>
          <li>Legendary = +25 XP</li>
          <li>Mythic = +50 XP</li>
        </ul>
      </div>

      {/* Section: Friends */}
      <div className="w-full p-5 rounded-xl bg-black/30 border border-pink-400/30">
        <h2 className="text-2xl font-bold mb-2 text-pink-400">👥 Make Friends</h2>
        <p>
          Search up players on the leaderboard, click their profile, and hit <span className="font-semibold">Add Friend</span>. Once you're connected, you can send messages and build your squad.
        </p>
      </div>

      {/* Section: Daily Grid */}
      <div className="w-full p-5 rounded-xl bg-black/30 border border-red-400/30">
        <h2 className="text-2xl font-bold mb-2 text-red-400">🧨 Daily Grid</h2>
        <p>
          Play the 5x5 bomb grid every day for a shot at free money and opals! Just don’t click the bomb or you’ll lose it all. 😬
        </p>
      </div>

      {/* Section: Inventory & Sets */}
      <div className="w-full p-5 rounded-xl bg-black/30 border border-purple-400/30">
        <h2 className="text-2xl font-bold mb-2 text-purple-400">📦 Collect & Craft</h2>
        <p>
          Hang onto your rewards from cases and wheels — store them in your inventory and use them to complete sets. Turn sets in for big Opal rewards and show off your collection.
        </p>
      </div>

      {/* Section: Avatars & Workers */}
      <div className="w-full p-5 rounded-xl bg-black/30 border border-emerald-400/30">
        <h2 className="text-2xl font-bold mb-2 text-emerald-400">🧍 Avatars & 🛠️ Workers</h2>
        <p>
          Customize your profile by equipping a unique avatar and selecting up to four workers to stand by your side. They don’t just look cool — workers also generate passive income. Click your avatar in the top bar to view or edit your profile and see how your team is stacked!
        </p>
      </div>
    </div>
  </div>
);


};

export default GameIdeas;
