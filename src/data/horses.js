// src/data/horses.js

export function generateHorses() {
  const allHorses = [
    { name: "Lightnin", img: "/images/horses/lightning.png" },
    { name: "Thunder", img: "/images/horses/thunder.png" },
    { name: "Blaze", img: "/images/horses/blaze.png" },
    { name: "Storm", img: "/images/horses/storm.png" },
    { name: "Shadow", img: "/images/horses/shadow.png" },
    { name: "Rocket", img: "/images/horses/rocket.png" },
    { name: "Bullet", img: "/images/horses/bullet.png" },
    { name: "Tornado", img: "/images/horses/tornado.png" },
    { name: "Comet", img: "/images/horses/comet.png" },
    { name: "Dash", img: "/images/horses/dash.png" },
    { name: "Ranger", img: "/images/horses/ranger.png" },
{ name: "Fury", img: "/images/horses/fury.png" },
{ name: "Blitz", img: "/images/horses/blitz.png" },
{ name: "Flash", img: "/images/horses/flash.png" },
{ name: "Charger", img: "/images/horses/charger.png" },
{ name: "Bandit", img: "/images/horses/bandit.png" },
{ name: "Drift", img: "/images/horses/drift.png" },
{ name: "Ace", img: "/images/horses/ace.png" },
{ name: "Echo", img: "/images/horses/echo.png" },
{ name: "Vortex", img: "/images/horses/vortex.png" },
{ name: "Jet", img: "/images/horses/jet.png" },
{ name: "Maverik", img: "/images/horses/maverik.png" }, // intentionally misspelled to fit character limit
{ name: "Nitro", img: "/images/horses/nitro.png" },
{ name: "Smokey", img: "/images/horses/smokey.png" },
{ name: "Spook", img: "/images/horses/spook.png" }

  ];

  const shuffled = allHorses.sort(() => 0.5 - Math.random()).slice(0, 6);

  // Assign a random integer from 2 to 50 to each horse
  const horsesWithOdds = shuffled.map(horse => {
    const oddsInt = Math.floor(Math.random() * 49) + 2; // range: 2 to 50
    return {
      ...horse,
      oddsInt,               // for display, like "1/17"
      rawProb: 1 / oddsInt   // for actual weighting
    };
  });

  // Normalize rawProb values to sum to 1
  const totalRaw = horsesWithOdds.reduce((sum, h) => sum + h.rawProb, 0);

  return horsesWithOdds.map(h => ({
    ...h,
    winChance: h.rawProb / totalRaw // normalized winning probability
  }));
}
