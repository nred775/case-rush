const wheels = [
  {
    name: "Lost & Found",
    emoji: "📮",
    cost: 15,
    items: [
      { name: "Cracked Sunglasses", value: 5 },
      { name: "Chewed Pen", value: 2 },
      { name: "Library Card", value: 3 },
      { name: "Forgotten Notebook", value: 18 }, // profit
      { name: "Old School ID", value: 20 },     // profit
      { name: "Rare Vintage Key", value: 30 },  // profit
      { name: "Abandoned Wallet", value: 40 },  // big profit
    ],
    style: {
      gradient: "from-slate-500 to-zinc-700",
    },
  },
  {
    name: "Party Time",
    emoji: "🎉",
    cost: 50,
    items: [
      { name: "Confetti Pack", value: 10 },
      { name: "Glow Stick Chain", value: 25 },
      { name: "Foam Party Hat", value: 35 },
      { name: "LED Shades", value: 50 },        // break even
      { name: "VIP Wristband", value: 65 },     // profit
      { name: "Boombox", value: 90 },           // profit
      { name: "Rave Drone", value: 150 },       // jackpot
    ],
    style: {
      gradient: "from-pink-400 via-yellow-300 to-blue-600",
    },
  },
  {
    name: "Jungle Spin",
    emoji: "🦜",
    cost: 40,
    items: [
      { name: "Banana Snack", value: 5 },
      { name: "Tree Frog Toy", value: 15 },
      { name: "Jungle Map", value: 30 },
      { name: "Explorer Boots", value: 40 },    // break even
      { name: "Poison Dart Frog", value: 55 },  // profit
      { name: "Rare Macaw Feather", value: 80 },// profit
      { name: "Golden Idol", value: 130 },      // jackpot
    ],
    style: {
      gradient: "from-green-500 via-lime-400 to-emerald-700",
    },
  },
  {
    name: "Scam Wheel",
    emoji: "💸",
    cost: 75,
    items: [
      { name: "MLM Brochure", value: 5 },
      { name: "Expired Crypto Token", value: 15 },
      { name: "Unverified NFT", value: 30 },
      { name: "Gambling Tip eBook", value: 65 },
      { name: "Sketchy iPad Raffle", value: 75 }, // break even
      { name: "Rigged Casino Chips", value: 100 },// profit
      { name: "Ponzi Pyramid Model", value: 175 },// jackpot
    ],
    style: {
      gradient: "from-red-500 via-yellow-400 to-orange-600",
    },
  },
  {
    name: "Streamer Wheel",
    emoji: "📺",
    cost: 100,
    items: [
      { name: "Sub Alert Sound", value: 40 },
      { name: "Scuffed Webcam", value: 50 },
      { name: "Streamer Mug", value: 80 },
      { name: "Mic Arm", value: 100 },           // break even
      { name: "RGB Chair", value: 120 },          // profit
      { name: "Donation Bomb", value: 150 },      // profit
      { name: "Raid from xQc", value: 250 },      // jackpot
    ],
    style: {
      gradient: "from-purple-600 via-blue-600 to-indigo-900",
    },
  },
  {
  name: "Grandma's Attic",
  emoji: "🧶",
  cost: 20,
  items: [
    { name: "Dusty Doily", value: 2 },
    { name: "Mothball Jar", value: 5 },
    { name: "Crochet Kit", value: 12 },
    { name: "WWII Love Letters", value: 20 },      // break even
    { name: "Antique Locket", value: 30 },         // profit
    { name: "Signed Elvis Vinyl", value: 50 },     // big profit
    { name: "Unopened Beanie Baby", value: 80 },   // jackpot
  ],
  style: {
    gradient: "from-yellow-200 via-amber-300 to-orange-500",
  },
},
{
  name: "Gas Station Bathroom",
  emoji: "🚽",
  cost: 10,
  items: [
    { name: "Single Ply Roll", value: 1 },
    { name: "Broken Soap Dispenser", value: 3 },
    { name: "Mysterious Key", value: 5 },
    { name: "Signed Stall Graffiti", value: 10 },  // break even
    { name: "Mint Condition Air Freshener", value: 18 }, // profit
    { name: "Lucky Lotto Ticket", value: 25 },     // profit
    { name: "Stack of Forgotten Cash", value: 60 },// jackpot
  ],
  style: {
    gradient: "from-gray-700 via-neutral-600 to-slate-500",
  },
},
{
  name: "Alien Souvenir Shop",
  emoji: "👽",
  cost: 60,
  items: [
    { name: "Moon Rock Replica", value: 15 },
    { name: "Glow-in-the-Dark Mug", value: 20 },
    { name: "UFO Fridge Magnet", value: 30 },
    { name: "Area 51 Hoodie", value: 60 },         // break even
    { name: "Alien Figurine (Signed)", value: 75 },// profit
    { name: "Abductee Starter Kit", value: 110 },  // profit
    { name: "Real Martian Tooth", value: 180 },    // jackpot
  ],
  style: {
    gradient: "from-green-300 via-teal-400 to-indigo-500",
  },
},
{
  name: "Middle School Lunch Tray",
  emoji: "🧃",
  cost: 25,
  items: [
    { name: "Mystery Meat", value: 3 },
    { name: "Squished Fruit Cup", value: 6 },
    { name: "Tradeable Capri-Sun", value: 10 },
    { name: "Pizza Friday Slice", value: 25 },     // break even
    { name: "Gold Foil Snack Pack", value: 35 },   // profit
    { name: "Secret Teacher's Cookie", value: 55 },// profit
    { name: "Hall Pass NFT", value: 90 },          // jackpot
  ],
  style: {
    gradient: "from-lime-300 via-yellow-200 to-orange-300",
  },
},
{
  name: "Boom or Bust",
  emoji: "🧨",
  cost: 100,
  items: [
    { name: "Charred Coin", value: 5 },
    { name: "Bent USB Stick", value: 8 },
    { name: "Empty Wallet", value: 1 },
    { name: "Scratch-Off (Already Scratched)", value: 3 },
    { name: "Lottery Receipt", value: 12 },
    { name: "Loose Diamond", value: 150 },       // big profit
    { name: "Black Market Chip Stack", value: 400 }, // jackpot
  ],
  style: {
    gradient: "from-black via-zinc-800 to-red-700",
  },
},
{
  name: "Casino Royale",
  emoji: "🎰",
  cost: 150,
  items: [
    { name: "Cigarette Stub", value: 5 },
    { name: "Used Dice", value: 10 },
    { name: "Pawned Watch", value: 35 },
    { name: "VIP Room Pass", value: 150 },        // break even
    { name: "Winning Roulette Chip", value: 200 },// profit
    { name: "Vault Keycard", value: 300 },        // big profit
    { name: "Mafia IOU", value: 500 },            // mega win
    { name: "Gold Bar with Serial", value: 1000 },// jackpot
  ],
  style: {
    gradient: "from-purple-800 via-yellow-400 to-black",
  },
},
{
  name: "Cursed Wheel",
  emoji: "🪦",
  cost: 70,
  items: [
    { name: "Cursed Doll", value: 3 },
    { name: "Rusty Nail", value: 2 },
    { name: "Half Candle", value: 5 },
    { name: "Broken Ouija Piece", value: 10 },
    { name: "Tarnished Ring", value: 15 },
    { name: "Possessed Amulet", value: 70 },       // break even
    { name: "Soul Contract", value: 220 },         // profit
    { name: "Unsealed Tomb Relic", value: 600 },   // jackpot
  ],
  style: {
    gradient: "from-gray-900 via-emerald-900 to-purple-950",
  },
},
{
  name: "Recession Special",
  emoji: "📉",
  cost: 50,
  items: [
    { name: "Crypto Rugpull Coin", value: 1 },
    { name: "Stock Chart Screenshot", value: 5 },
    { name: "Foreclosed House Key", value: 8 },
    { name: "Bankruptcy Paper", value: 2 },
    { name: "Layoff Letter", value: 0 },
    { name: "Rare Meme NFT", value: 60 },         // barely profit
    { name: "AI Startup Equity", value: 1000 },    // massive profit
  ],
  style: {
    gradient: "from-slate-700 via-gray-600 to-red-500",
  },
},
{
  name: "Executive Spin",
  emoji: "💼",
  cost: 1000,
  items: [
    { name: "Used Conference Badge", value: 50 },
    { name: "Cracked Company iPad", value: 300 },
    { name: "Stock Options (Worthless)", value: 200 },
    { name: "Luxury Office Chair", value: 800 },
    { name: "Private Jet Seat Voucher", value: 1200 },   // tiny profit
    { name: "Secret Company Buyout Doc", value: 2500 },  // profit
    { name: "Boardroom Coup Reward", value: 10_000 },    // jackpot
  ],
  style: {
    gradient: "from-gray-900 via-blue-800 to-cyan-500",
  },
},
{
  name: "Fate of the Gods",
  emoji: "🔮",
  cost: 5000,
  items: [
    { name: "Shattered Prophecy", value: 100 },
    { name: "Burnt Offering", value: 300 },
    { name: "Titan Bone", value: 1000 },
    { name: "Sacred Relic", value: 5000 },      // break even
    { name: "Divine Intervention", value: 7500 },// profit
    { name: "Immortal Blessing", value: 15000 },// big profit
    { name: "Control of Olympus", value: 30000 },// insane jackpot
  ],
  style: {
    gradient: "from-indigo-900 via-purple-800 to-yellow-400",
  },
},
{
  name: "Whale Watch",
  emoji: "🐋",
  cost: 10000,
  items: [
    { name: "Overpriced NFT", value: 500 },
    { name: "Crypto Crash Memo", value: 50 },
    { name: "Luxury Yacht Keychain", value: 2000 },
    { name: "Bored Ape Hoodie", value: 9000 },
    { name: "Rare Coin Collection", value: 12000 },   // profit
    { name: "Blue Checkmark (IRL)", value: 25000 },   // profit
    { name: "Private Island Timeshare", value: 50000 },// massive jackpot
  ],
  style: {
    gradient: "from-blue-950 via-cyan-700 to-white",
  },
},
{
  name: "Neural Spin",
  emoji: "🧠",
  cost: 25000,
  items: [
    { name: "Old VR Headset", value: 400 },
    { name: "Rejected Patent", value: 600 },
    { name: "Implanted Microchip", value: 25000 },      // break even
    { name: "Quantum Brain Enhancer", value: 40000 },   // profit
    { name: "AI Merge Access Code", value: 90000 },     // mega jackpot
  ],
  style: {
    gradient: "from-zinc-900 via-sky-900 to-blue-400",
  },
},
{
  name: "Welcome Wheel",
  emoji: "🎁",
  cost: 0,
  items: [
    { name: "🧷 Safety Pin", value: 1 },
    { name: "📎 Paper Clip", value: 2 },
    { name: "🧦 Lone Sock", value: 3 },
    { name: "🔖 Sticker Pack", value: 4 },
    { name: "🍬 Floor Candy", value: 5 },
    { name: "🖊️ Chewed Pen", value: 2 },
    { name: "🔑 Worn Keychain", value: 3 },
  ],
  style: {
    gradient: "from-gray-400 to-gray-800",
  },
},
{
  name: "Billionaire Wheel",
  emoji: "🤑",
  cost: 1_000_000,
  items: [
    { name: "🍾 Broken Champagne Bottle", value: 5_000 },
    { name: "📉 NFT Lawsuit", value: 15_000 },
    { name: "📦 Failed Startup Stock", value: 50_000 },
    { name: "💼 Solid Gold Briefcase", value: 250_000 },
    { name: "🏙️ Penthouse Deed", value: 600_000 },
    { name: "🛥️ Custom Superyacht", value: 1_500_000 },
    { name: "🌐 Internet Ownership Token", value: 3_000_000 },
  ],
  style: {
    gradient: "from-yellow-400 via-amber-600 to-red-800",
  },
},
{
  name: "Corporate Climb",
  emoji: "💼",
  cost: 500,
  items: [
    { name: "🗒️ Crumpled Resume", value: 50 },
    { name: "🖊️ Fancy Pen", value: 150 },
    { name: "📠 Old Fax Machine", value: 200 },
    { name: "🧳 Briefcase", value: 500 },
    { name: "📈 Company Shares", value: 750 },
    { name: "💳 Corporate Card", value: 900 },
    { name: "🏢 Building Ownership", value: 1200 },
  ],
  style: {
    gradient: "from-slate-700 via-blue-700 to-cyan-500",
  },
},
{
  name: "Retro Wheel",
  emoji: "🕹️",
  cost: 200,
  items: [
    { name: "📼 VHS Tape", value: 25 },
    { name: "📻 Boombox", value: 80 },
    { name: "💿 Collector Disc", value: 120 },
    { name: "🎮 Classic Controller", value: 200 },
    { name: "🧸 Pixel Plushie", value: 260 },
    { name: "🖥️ CRT Monitor", value: 325 },
    { name: "🛸 Retro Arcade Cabinet", value: 450 },
  ],
  style: {
    gradient: "from-pink-500 via-indigo-600 to-purple-900",
  },
},
{
  name: "Moonshot Wheel",
  emoji: "🚀",
  cost: 10_000,
  items: [
    { name: "🪙 Shiba Coin", value: 200 },
    { name: "📉 Failed Crypto", value: 1_000 },
    { name: "📈 Recovered Token", value: 8_000 },
    { name: "🛸 Space Tour Ticket", value: 12_000 },
    { name: "🌕 Moon Property Deed", value: 25_000 },
    { name: "🌌 Interstellar Shares", value: 40_000 },
    { name: "🪐 Alien Partnership Deal", value: 100_000 },
  ],
  style: {
    gradient: "from-indigo-900 via-blue-800 to-purple-700",
  },
},
{
  name: "Holiday Hype",
  emoji: "🎄",
  cost: 350,
  items: [
    { name: "🎁 Mystery Socks", value: 80 },
    { name: "☃️ Snow Globe", value: 140 },
    { name: "🧣 Limited Scarf Drop", value: 180 },
    { name: "🎧 Holiday Remix Headphones", value: 250 },
    { name: "🛷 Sleigh Ride Pass", value: 350 },    // break even
    { name: "🕯️ Gold-Tipped Candle Set", value: 500 },
    { name: "🎅 Secret Santa NFT", value: 750 },
    { name: "🎆 North Pole Experience", value: 1200 },
  ],
  style: {
    gradient: "from-red-400 via-green-500 to-white",
  },
},
{
  name: "Wheelception",
  emoji: "🌀",
  cost: 777,
  items: [
    { name: "🔄 Mini Wheel Token", value: 50 },
    { name: "🎲 Randomizer Chip", value: 125 },
    { name: "🧩 Puzzle Spinner", value: 200 },
    { name: "🔧 Wheel Crank", value: 300 },
    { name: "🧠 Wheel Strategy Guide", value: 400 },
    { name: "🎡 Bonus Spin Voucher", value: 777 }, // break even
    { name: "🎰 Multi-Spin Trigger", value: 1200 },
    { name: "💫 Infinite Loop Key", value: 2500 },
  ],
  style: {
    gradient: "from-indigo-500 via-pink-500 to-yellow-300",
  },
}







];

export default wheels;
