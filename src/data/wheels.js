const wheels = [
  {
    name: "Lost & Found",
    emoji: "📮",
    cost: 15,
    items: [
      { name: "Cracked Sunglasses", value: 1 },
      { name: "Chewed Pen", value: 2 },
      { name: "Library Card", value: 3 },
      { name: "Forgotten Notebook", value: 5 },
      { name: "Old School ID", value: 10 },
      { name: "Rare Vintage Key", value: 18 },
      { name: "Abandoned Wallet", value: 30 }, // jackpot
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
      { name: "Confetti Pack", value: 1 },
      { name: "Glow Stick Chain", value: 5 },
      { name: "Foam Party Hat", value: 20 },
      { name: "LED Shades", value: 35 },
      { name: "VIP Wristband", value: 45 },
      { name: "Boombox", value: 60 },
      { name: "Rave Drone", value: 110 }, // jackpot
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
      { name: "Banana Snack", value: 3 },
      { name: "Tree Frog Toy", value: 10 },
      { name: "Jungle Map", value: 25 },
      { name: "Explorer Boots", value: 35 },
      { name: "Poison Dart Frog", value: 45 },
      { name: "Rare Macaw Feather", value: 60 },
      { name: "Golden Idol", value: 100 }, // jackpot
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
      { name: "MLM Brochure", value: 2 },
      { name: "Expired Crypto Token", value: 10 },
      { name: "Unverified NFT", value: 20 },
      { name: "Gambling Tip eBook", value: 50 },
      { name: "Sketchy iPad Raffle", value: 70 },
      { name: "Rigged Casino Chips", value: 90 },
      { name: "Ponzi Pyramid Model", value: 150 }, // jackpot
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
      { name: "Sub Alert Sound", value: 20 },
      { name: "Scuffed Webcam", value: 30 },
      { name: "Streamer Mug", value: 60 },
      { name: "Mic Arm", value: 80 },
      { name: "RGB Chair", value: 100 },  // break even
      { name: "Donation Bomb", value: 120 },
      { name: "Raid from xQc", value: 200 }, // jackpot
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
    { name: "Dusty Doily", value: 1 },
    { name: "Mothball Jar", value: 3 },
    { name: "Crochet Kit", value: 8 },
    { name: "WWII Love Letters", value: 15 },
    { name: "Antique Locket", value: 22 },
    { name: "Signed Elvis Vinyl", value: 35 },
    { name: "Unopened Beanie Baby", value: 65 }, // jackpot
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
    { name: "Broken Soap Dispenser", value: 2 },
    { name: "Mysterious Key", value: 4 },
    { name: "Signed Stall Graffiti", value: 8 },
    { name: "Mint Condition Air Freshener", value: 12 },
    { name: "Lucky Lotto Ticket", value: 16 },
    { name: "Stack of Forgotten Cash", value: 45 }, // jackpot
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
    { name: "Moon Rock Replica", value: 10 },
    { name: "Glow-in-the-Dark Mug", value: 15 },
    { name: "UFO Fridge Magnet", value: 25 },
    { name: "Area 51 Hoodie", value: 45 },
    { name: "Alien Figurine (Signed)", value: 60 }, // break even
    { name: "Abductee Starter Kit", value: 90 },
    { name: "Real Martian Tooth", value: 160 }, // jackpot
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
    { name: "Mystery Meat", value: 2 },
    { name: "Squished Fruit Cup", value: 4 },
    { name: "Tradeable Capri-Sun", value: 8 },
    { name: "Pizza Friday Slice", value: 18 },
    { name: "Gold Foil Snack Pack", value: 25 }, // break even
    { name: "Secret Teacher's Cookie", value: 40 },
    { name: "Hall Pass NFT", value: 70 }, // jackpot
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
    { name: "Charred Coin", value: 2 },
    { name: "Bent USB Stick", value: 5 },
    { name: "Empty Wallet", value: 1 },
    { name: "Scratch-Off (Already Scratched)", value: 4 },
    { name: "Lottery Receipt", value: 8 },
    { name: "Loose Diamond", value: 120 },
    { name: "Black Market Chip Stack", value: 350 }, // jackpot
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
    { name: "Cigarette Stub", value: 2 },
    { name: "Used Dice", value: 5 },
    { name: "Pawned Watch", value: 15 },
    { name: "VIP Room Pass", value: 100 },
    { name: "Winning Roulette Chip", value: 140 },
    { name: "Vault Keycard", value: 200 },
    { name: "Mafia IOU", value: 400 },
    { name: "Gold Bar with Serial", value: 900 }, // jackpot
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
    { name: "Cursed Doll", value: 1 },
    { name: "Rusty Nail", value: 2 },
    { name: "Half Candle", value: 3 },
    { name: "Broken Ouija Piece", value: 5 },
    { name: "Tarnished Ring", value: 10 },
    { name: "Possessed Amulet", value: 50 },
    { name: "Soul Contract", value: 130 },
    { name: "Unsealed Tomb Relic", value: 500 }, // jackpot
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
    { name: "Crypto Rugpull Coin", value: 0 },
    { name: "Stock Chart Screenshot", value: 1 },
    { name: "Foreclosed House Key", value: 4 },
    { name: "Bankruptcy Paper", value: 0 },
    { name: "Layoff Letter", value: 0 },
    { name: "Rare Meme NFT", value: 30 },
    { name: "AI Startup Equity", value: 800 }, // mega W
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
    { name: "Cracked Company iPad", value: 150 },
    { name: "Stock Options (Worthless)", value: 100 },
    { name: "Luxury Office Chair", value: 600 },
    { name: "Private Jet Seat Voucher", value: 900 },
    { name: "Secret Company Buyout Doc", value: 1500 },
    { name: "Boardroom Coup Reward", value: 5000 }, // jackpot
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
    { name: "Shattered Prophecy", value: 50 },
    { name: "Burnt Offering", value: 100 },
    { name: "Titan Bone", value: 300 },
    { name: "Sacred Relic", value: 3500 },
    { name: "Divine Intervention", value: 5000 }, // break even
    { name: "Immortal Blessing", value: 9000 },
    { name: "Control of Olympus", value: 20000 }, // god-tier
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
      { name: "Overpriced NFT", value: 200 },
      { name: "Crypto Crash Memo", value: 50 },
      { name: "Luxury Yacht Keychain", value: 1000 },
      { name: "Bored Ape Hoodie", value: 6000 },
      { name: "Rare Coin Collection", value: 8500 },
      { name: "Blue Checkmark (IRL)", value: 15000 },
      { name: "Private Island Timeshare", value: 35000 },
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
      { name: "Old VR Headset", value: 300 },
      { name: "Rejected Patent", value: 800 },
      { name: "Implanted Microchip", value: 20000 },
      { name: "Quantum Brain Enhancer", value: 30000 },
      { name: "AI Merge Access Code", value: 75000 },
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
    cost: 1000000,
    items: [
      { name: "🍾 Broken Champagne Bottle", value: 5000 },
      { name: "📉 NFT Lawsuit", value: 10000 },
      { name: "📦 Failed Startup Stock", value: 20000 },
      { name: "💼 Solid Gold Briefcase", value: 150000 },
      { name: "🏙️ Penthouse Deed", value: 400000 },
      { name: "🛥️ Custom Superyacht", value: 800000 },
      { name: "🌐 Internet Ownership Token", value: 2500000 },
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
      { name: "🗒️ Crumpled Resume", value: 30 },
      { name: "🖊️ Fancy Pen", value: 100 },
      { name: "📠 Old Fax Machine", value: 150 },
      { name: "🧳 Briefcase", value: 400 },
      { name: "📈 Company Shares", value: 550 },
      { name: "💳 Corporate Card", value: 700 },
      { name: "🏢 Building Ownership", value: 1000 },
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
      { name: "📼 VHS Tape", value: 10 },
      { name: "📻 Boombox", value: 40 },
      { name: "💿 Collector Disc", value: 90 },
      { name: "🎮 Classic Controller", value: 150 },
      { name: "🧸 Pixel Plushie", value: 200 },
      { name: "🖥️ CRT Monitor", value: 260 },
      { name: "🛸 Retro Arcade Cabinet", value: 350 },
    ],
    style: {
      gradient: "from-pink-500 via-indigo-600 to-purple-900",
    },
  },
  {
    name: "Moonshot Wheel",
    emoji: "🚀",
    cost: 10000,
    items: [
      { name: "🪙 Shiba Coin", value: 100 },
      { name: "📉 Failed Crypto", value: 400 },
      { name: "📈 Recovered Token", value: 5000 },
      { name: "🛸 Space Tour Ticket", value: 8000 },
      { name: "🌕 Moon Property Deed", value: 15000 },
      { name: "🌌 Interstellar Shares", value: 30000 },
      { name: "🪐 Alien Partnership Deal", value: 80000 },
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
      { name: "🎁 Mystery Socks", value: 50 },
      { name: "☃️ Snow Globe", value: 100 },
      { name: "🧣 Limited Scarf Drop", value: 120 },
      { name: "🎧 Holiday Remix Headphones", value: 180 },
      { name: "🛷 Sleigh Ride Pass", value: 280 },
      { name: "🕯️ Gold-Tipped Candle Set", value: 400 },
      { name: "🎅 Secret Santa NFT", value: 550 },
      { name: "🎆 North Pole Experience", value: 1000 },
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
      { name: "🔄 Mini Wheel Token", value: 30 },
      { name: "🎲 Randomizer Chip", value: 100 },
      { name: "🧩 Puzzle Spinner", value: 150 },
      { name: "🔧 Wheel Crank", value: 200 },
      { name: "🧠 Wheel Strategy Guide", value: 300 },
      { name: "🎡 Bonus Spin Voucher", value: 600 },
      { name: "🎰 Multi-Spin Trigger", value: 950 },
      { name: "💫 Infinite Loop Key", value: 2000 },
    ],
    style: {
      gradient: "from-indigo-500 via-pink-500 to-yellow-300",
    },
  },
{
  name: "Wheel of Everything",
  emoji: "🌐",
  cost: 1_000_000_000_000,
  items: [
    { name: "🪙 Useless Penny", value: 1 },
    { name: "🦠 Dead Meme NFT", value: 10_000 },
    { name: "🐒 Evolution Reversal Kit", value: 100_000 },
    { name: "🎮 Autoplay for Life", value: 100_000_000 },
    { name: "📡 Alien Stock Tip", value: 10_000_000_000 },
    { name: "🔑 Simulation Admin Key", value: 300_000_000_000 },
    { name: "🚪 Door to Other Dimensions", value: 700_000_000_000 },
    { name: "🌀 The Answer to Everything", value: 2_000_000_000_000 }, // insane jackpot
  ],
  style: {
    gradient: "from-black via-indigo-950 to-white",
    glowColor: "unreal",
  },
},
{
  name: "DOOM SPIN",
  emoji: "☠️",
  cost: 250,
  items: [
    { name: "Shattered Mirror", value: 1 },
    { name: "Black Cat Fur", value: 2 },
    { name: "Broken Umbrella", value: 3 },
    { name: "Cursed Penny", value: 5 },
    { name: "Back Luck Charm", value: 10 },
    { name: "Golden Horseshoe", value: 1200 }, // absurd jackpot
  ],
  style: {
    gradient: "from-black via-red-900 to-purple-800",
  },
},
{
  name: "All or Nothing",
  emoji: "🎯",
  cost: 500,
  items: [
    { name: "Nothing", value: 0 },
    { name: "Nothing", value: 0 },
    { name: "Nothing", value: 0 },
    { name: "Lucky Win", value: 1250 },
    { name: "Insane Upside", value: 2000 },
  ],
  style: {
    gradient: "from-gray-900 via-slate-600 to-yellow-400",
  },
},
{
  name: "High Stakes Flip",
  emoji: "🪙",
  cost: 100000,
  items: [
    { name: "1$ Tragedy", value: 1 },
    { name: "200k Miracle", value: 200000 },
  ],
  style: {
    gradient: "from-yellow-900 via-black to-green-400",
  },
},
{
  name: "1 in 5 Millionaire",
  emoji: "💸",
  cost: 100000,
  items: [
    { name: "Dusty Penny", value: 1 },
    { name: "Crumpled Receipt", value: 1 },
    { name: "Fake Gold Chain", value: 1 },
    { name: "Scratched Raffle Ticket", value: 1 },
    { name: "Millionaire's Briefcase", value: 1000000 },
  ],
  style: {
    gradient: "from-black via-gray-700 to-gold-500",
  },
},








];

export default wheels;
