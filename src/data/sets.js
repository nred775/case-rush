const sets = [
  {
    name: "Street Flex",
    requiredItems: [
      { name: "🧢 Limited Snapback", rarity: "common", source: "💎 Flex Lottery" },
      { name: "👟 Brand Collab Sneakers", rarity: "common", source: "💎 Flex Lottery" },
      { name: "🧢 Heatwave Collab Cap", rarity: "epic", source: "🔥 Heat Check" },
      { name: "🧥 Street Flex Jacket", rarity: "common", source: "🧥 Designer Damage" }
    ],
    reward: 5
  },
  {
    name: "Late Night Tech",
    requiredItems: [
      { name: "🎧 Wireless Pod Set", rarity: "rare", source: "📡 Signal Boost" },
      { name: "💡 Mood Lighting Grid", rarity: "epic", source: "🧃 Neon Breakroom" },
      { name: "🖥️ UltraWide Monitor", rarity: "rare", source: "🖥️ Luxury Desk Setup" },
      { name: "📦 Productivity Recharge Pack", rarity: "epic", source: "🧃 Neon Breakroom" }
    ],
    reward: 5
  },
  {
    name: "Mini Room Makeover",
    requiredItems: [
      { name: "🛋️ Lounge Bean Seat", rarity: "rare", source: "🏙️ Loft Drop" },
      { name: "💡 Hanging Neon Art", rarity: "epic", source: "🏙️ Loft Drop" },
      { name: "🧴 Aesthetic Organizer Kit", rarity: "epic", source: "🏙️ Loft Drop" },
      { name: "🖼️ Wall Grid Display", rarity: "epic", source: "🏙️ Loft Drop" }
    ],
    reward: 5
  },
  {
    name: "Collector's Vault",
    requiredItems: [
      { name: "📦 Mystery Figure", rarity: "common", source: "🗃️ Collector" },
      { name: "🎮 Retro Game Box", rarity: "common", source: "🗃️ Collector" },
      { name: "🖼️ Limited Art Print", rarity: "rare", source: "🗃️ Collector" },
      { name: "🗃️ Grail Item Vaulted", rarity: "epic", source: "🗃️ Collector" }
    ],
    reward: 5
  },
  {
    name: "Cozy Chaos",
    requiredItems: [
      { name: "🛋️ Lounge Bean Seat", rarity: "rare", source: "🏙️ Loft Drop" },
      { name: "📦 Productivity Recharge Pack", rarity: "epic", source: "🧃 Neon Breakroom" },
      { name: "🎧 Park Beats Headphones", rarity: "common", source: "🛹 Skater's Deluxe" },
      { name: "🧴 Aesthetic Organizer Kit", rarity: "epic", source: "🏙️ Loft Drop" }
    ],
    reward: 5
  },
  {
    name: "Underground Delivery",
    requiredItems: [
      { name: "📦 Suspicious USB Stick", rarity: "rare", source: "💻 Darkweb Delivery" },
      { name: "🧥 Guard Uniform", rarity: "rare", source: "🚪 Vaulted Vice" },
      { name: "📱 Burner Smartphone", rarity: "common", source: "🔦 Heist" },
      { name: "🧴 Blackout Gloves", rarity: "rare", source: "🔑 Blacklist Vault" }
    ],
    reward: 5
  },
  {
    name: "Modern Minimalist",
    requiredItems: [
      { name: "🖊️ Premium Pen Set", rarity: "common", source: "🖥️ Luxury Desk Setup" },
      { name: "🧴 Desk Cleaner Kit", rarity: "common", source: "🖥️ Luxury Desk Setup" },
      { name: "📘 Leather Notebook", rarity: "common", source: "🖥️ Luxury Desk Setup" },
      { name: "📿 Prestige Medal Chain", rarity: "epic", source: "🥇 Gilded Gamble" }
    ],
    reward: 5
  },
  {
    name: "Sneakerhead Dreams",
    requiredItems: [
      { name: "👟 Brand Collab Sneakers", rarity: "common", source: "💎 Flex Lottery" },
      { name: "👟 Hype Drop Pair", rarity: "rare", source: "👟 Sneaker Shuffle" },
      { name: "👟 Ultra-Limited Pair", rarity: "rare", source: "👟 Sneaker Shuffle" },
      { name: "🧽 Sneaker Cleaner Kit", rarity: "common", source: "👟 Sneaker Shuffle" }
    ],
    reward: 5
  },
  {
    name: "Hacker's Arsenal",
    requiredItems: [
      { name: "📱 Burner Phone", rarity: "common", source: "💼 Cartel Case" },
      { name: "📦 Suspicious USB Stick", rarity: "rare", source: "💻 Darkweb Delivery" },
      { name: "📀 Encrypted Disk Drive", rarity: "epic", source: "🔑 Blacklist Vault" },
      { name: "🔐 Ghost Login Device", rarity: "rare", source: "💻 Darkweb Delivery" }
    ],
    reward: 5
  },
  {
    name: "Vibe Lounge",
    requiredItems: [
      { name: "💡 Mood Lighting Grid", rarity: "epic", source: "🧃 Neon Breakroom" },
      { name: "🎧 Vibe Speaker Bar", rarity: "epic", source: "🏙️ Loft Drop" },
      { name: "🛋️ Lounge Bean Seat", rarity: "rare", source: "🏙️ Loft Drop" },
      { name: "📺 Looping Breaktime TV", rarity: "rare", source: "🧃 Neon Breakroom" }
    ],
    reward: 5
  },
  {
    name: "Streamer Essentials",
    requiredItems: [
      { name: "🎙️ Desk Mic", rarity: "common", source: "🎥 Streaming Setup" },
      { name: "📷 Webcam", rarity: "common", source: "🎥 Streaming Setup" },
      { name: "🧢 Streamer Hat", rarity: "common", source: "🎥 Streaming Setup" },
      { name: "📸 Face Cam Pro", rarity: "epic", source: "📺 Flex Stream" }
    ],
    reward: 5
  },
  {
    name: "Travel Prep Kit",
    requiredItems: [
      { name: "🎧 Noise Canceling Earbuds", rarity: "common", source: "🧳 Weekend Trip" },
      { name: "📱 Universal Charger", rarity: "common", source: "✈️ Travel Tech" },
      { name: "🎒 Travel Pouch", rarity: "common", source: "✈️ Travel Tech" },
      { name: "🎫 Hotel Gift Card", rarity: "rare", source: "🧳 Weekend Trip" }
    ],
    reward: 5
  },
   {
    name: "Creator's Vault",
    requiredItems: [
      { name: "🖥️ Editing Monitor", rarity: "rare", source: "🧪 Creator Lab Pro" },
      { name: "📹 Pro Rig Bundle", rarity: "epic", source: "🧪 Creator Lab Pro" },
      { name: "🧪 Full Studio Launch", rarity: "epic", source: "🧪 Creator Lab Pro" },
      { name: "📹 Editing Suite License", rarity: "epic", source: "📸 Content Creation Kit" },
      { name: "🖥️ Stream Deck", rarity: "rare", source: "🎥 Streaming Setup" }
    ],
    reward: 10
  },
  {
    name: "Streamer Palace",
    requiredItems: [
      { name: "📸 Face Cam Pro", rarity: "epic", source: "📺 Flex Stream" },
      { name: "🖥️ Dual Monitor Mount Kit", rarity: "epic", source: "📺 Flex Stream" },
      { name: "🎙️ Audio Mixer", rarity: "epic", source: "📺 Flex Stream" },
      { name: "🎨 Animated Overlay Set", rarity: "rare", source: "📺 Flex Stream" },
      { name: "📦 Stream Deck Mini", rarity: "rare", source: "📺 Flex Stream" },
      { name: "📺 Signature Broadcast Vault", rarity: "epic", source: "📺 Flex Stream" }
    ],
    reward: 10
  },
  {
    name: "Ultra Gaming Rig",
    requiredItems: [
      { name: "🎮 Console with Skin", rarity: "epic", source: "🕹️ Gamer God Gear" },
      { name: "🧃 Energy Supply Crate", rarity: "epic", source: "🕹️ Gamer God Gear" },
      { name: "🖥️ Curved Monitor", rarity: "epic", source: "🕹️ Gamer God Gear" },
      { name: "📦 Full Setup Starter Pack", rarity: "epic", source: "🕹️ Gamer God Gear" },
      { name: "⌨️ RGB Keyboard", rarity: "rare", source: "🕹️ Gamer God Gear" },
      { name: "🖱️ Pro Mouse Bundle", rarity: "rare", source: "🕹️ Gamer God Gear" }
    ],
    reward: 10
  },
  {
    name: "Fit For Fame",
    requiredItems: [
      { name: "👓 Fashion Sunglasses", rarity: "epic", source: "👗 Luxury Fashion Drop" },
      { name: "💄 Couture Makeup Kit", rarity: "epic", source: "👗 Luxury Fashion Drop" },
      { name: "👟 Collab Sneakers", rarity: "rare", source: "👗 Luxury Fashion Drop" },
      { name: "🧥 Statement Coat", rarity: "legendary", source: "👗 Luxury Fashion Drop" },
      { name: "👔 Runway Fit", rarity: "epic", source: "👗 Luxury Fashion Drop" }
    ],
    reward: 10
  },
  {
    name: "Neon Command",
    requiredItems: [
      { name: "📦 Productivity Recharge Pack", rarity: "epic", source: "🧃 Neon Breakroom" },
      { name: "💡 Mood Lighting Grid", rarity: "epic", source: "🧃 Neon Breakroom" },
      { name: "🎧 Urban Audio Rig", rarity: "epic", source: "🔥 Heat Check" },
      { name: "🧥 Streetwear Drop Set", rarity: "epic", source: "🔥 Heat Check" },
      { name: "📦 Hypebox Special", rarity: "epic", source: "🔥 Heat Check" }
    ],
    reward: 10
  },
  {
    name: "Digital Titan",
    requiredItems: [
      { name: "💻 Ultrabook", rarity: "legendary", source: "🤖 Tech Titan" },
      { name: "🧠 AI Workstation", rarity: "legendary", source: "🤖 Tech Titan" },
      { name: "🖥️ 4K Creative Monitor", rarity: "epic", source: "🤖 Tech Titan" },
      { name: "🔋 Smartwatch", rarity: "rare", source: "🤖 Tech Titan" },  // swap if needed
      { name: "🎧 Noise Canceling Over-Ears", rarity: "epic", source: "🤖 Tech Titan" }
    ],
    reward: 10
  },
  {
    name: "Drip Dynasty",
    requiredItems: [
      { name: "🧥 Statement Coat", rarity: "legendary", source: "👗 Luxury Fashion Drop" },
      { name: "👜 Mini Handbag", rarity: "rare", source: "👗 Luxury Fashion Drop" }, // swap if needed
      { name: "💄 Couture Makeup Kit", rarity: "epic", source: "👗 Luxury Fashion Drop" },
      { name: "👓 Fashion Sunglasses", rarity: "epic", source: "👗 Luxury Fashion Drop" },
      { name: "👔 Runway Fit", rarity: "epic", source: "👗 Luxury Fashion Drop" },
      { name: "👟 Collab Sneakers", rarity: "rare", source: "👗 Luxury Fashion Drop" } // swap if needed
    ],
    reward: 10
  },
  {
    name: "Legend Loadout",
    requiredItems: [
      { name: "🛡️ Liberty Defender Shield", rarity: "epic", source: "🛡️ Legend Lore" },
      { name: "🦾 Arc-Powered Gauntlet", rarity: "epic", source: "🛡️ Legend Lore" },
      { name: "🧙‍♂️ Wizard’s Oak Staff", rarity: "legendary", source: "🛡️ Legend Lore" },
      { name: "🦇 Nocturnal Vigilant Tools", rarity: "legendary", source: "🛡️ Legend Lore" },
      { name: "💍 Enchanted Ring of Ages", rarity: "legendary", source: "🛡️ Legend Lore" }
    ],
    reward: 10
  },
   {
  name: "Elite Trial 1",
  requiredItems: [
    { name: "🔒 Locked Abyss Lockbox", rarity: "legendary", source: "🕳️ Vault of the Void" },
    { name: "🎖️ First Edition Stock Stamp", rarity: "legendary", source: "🏛️ Hall of Riches" },
    { name: "🪞 Reflective Nothing Tag", rarity: "legendary", source: "🕳️ Vault of the Void" },
    { name: "👑 Imperial Holder Case", rarity: "legendary", source: "🏛️ Hall of Riches" },
    { name: "🧳 Endless Loop Case", rarity: "legendary", source: "🕳️ Vault of the Void" },
    { name: "📜 Forgotten Treasure Deed", rarity: "epic", source: "🏛️ Hall of Riches" },
    { name: "🏛️ Hall of Riches Seal", rarity: "legendary", source: "🏛️ Hall of Riches" },
    { name: "📄 Blank Entry Form", rarity: "epic", source: "🕳️ Vault of the Void" }
  ],
  reward: 25
},
{
  name: "Elite Trial 2",
  requiredItems: [
    { name: "🎫 Exclusive Concert Passes", rarity: "legendary", source: "🌎 World Tour" },
    { name: "🖥️ Dev Tower Build", rarity: "common", source: "💻 Code Black" },
    { name: "👾 Live Coding Arena Access", rarity: "mythic", source: "💻 Code Black" },
    { name: "🌎 Global Explorer Experience", rarity: "legendary", source: "🌎 World Tour" },
    { name: "💾 Cloud Datacenter Credits", rarity: "common", source: "💻 Code Black" },
    { name: "🧠 AI Research Workstation", rarity: "common", source: "💻 Code Black" },
    { name: "📦 Cultural Experience Kit", rarity: "legendary", source: "🌎 World Tour" },
    { name: "🛫 First-Class Ticket Pair", rarity: "legendary", source: "🌎 World Tour" }
  ],
  reward: 25
},
{
  name: "Elite Trial 3",
  requiredItems: [
    { name: "🧑‍🚀 Zero-Gravity Training", rarity: "common", source: "🪐 Starlight Run" },
    { name: "🪙 Golden Paradox Coin", rarity: "epic", source: "🚪 Golden Exit" },
    { name: "🌠 Astronaut Night Tour", rarity: "common", source: "🪐 Starlight Run" },
    { name: "🛰️ Suborbital Flight Ticket", rarity: "common", source: "🪐 Starlight Run" },
    { name: "🎓 Winner's Envelope", rarity: "legendary", source: "🚪 Golden Exit" },
    { name: "🫄 Clean Slate Plaque", rarity: "epic", source: "🚪 Golden Exit" },
    { name: "🏁 Golden Exit Portal", rarity: "mythic", source: "🚪 Golden Exit" },
    { name: "🪐 Edge of Orbit Access", rarity: "mythic", source: "🪐 Starlight Run" }
  ],
  reward: 25
},
{
  name: "Elite Trial 4",
  requiredItems: [
    { name: "👑 King’s Retirement Throne", rarity: "legendary", source: "👑 Royal Treatment" },
    { name: "🪞 Throne Reflection Glass", rarity: "legendary", source: "👑 Royal Treatment" },
    { name: "📀 Lucid Disk", rarity: "mythic", source: "🌀 Dream Sequence" },
    { name: "🌀 Infinite Dream Shard", rarity: "mythic", source: "🌀 Dream Sequence" },
    { name: "🎤 Golden Microphone Replica", rarity: "legendary", source: "🌟 Pop Culture" },
    { name: "📀 Platinum Record Plaque", rarity: "legendary", source: "🌟 Pop Culture" },
    { name: "💎 Flawless Earring Pair", rarity: "legendary", source: "💎 Diamond Dilemma" },
    { name: "🔷 Rare Blue Diamond Chip", rarity: "legendary", source: "💎 Diamond Dilemma" }
  ],
  reward: 25
},
  {
  name: "Mythic Completionist",
  requiredItems: [
    // Starlight Run
    { name: "🛰️ Suborbital Flight Ticket", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "🧑‍🚀 Zero-Gravity Training", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "🌠 Astronaut Night Tour", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "🔭 Stargazer Elite Setup", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "🛏️ Deep Sleep Capsule", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "📦 Space Adventure Gear", rarity: "mythic", source: "🪐 Starlight Run" },
    { name: "🪐 Edge of Orbit Access", rarity: "mythic", source: "🪐 Starlight Run" },

    // Code Black
    { name: "🧠 AI Research Workstation", rarity: "mythic", source: "💻 Code Black" },
    { name: "💾 Cloud Datacenter Credits", rarity: "mythic", source: "💻 Code Black" },
    { name: "🖥️ Dev Tower Build", rarity: "mythic", source: "💻 Code Black" },
    { name: "🔐 Quantum Encryption Module", rarity: "mythic", source: "💻 Code Black" },
    { name: "📦 Full Hacker Suite", rarity: "mythic", source: "💻 Code Black" },
    { name: "👾 Live Coding Arena Access", rarity: "mythic", source: "💻 Code Black" },

    // Skyline Pulse
    { name: "🏙️ Penthouse Weekend Stay", rarity: "mythic", source: "🌇 Skyline Pulse" },
    { name: "📸 Helicopter Photo Tour", rarity: "mythic", source: "🌇 Skyline Pulse" },
    { name: "🛋️ Designer Suite Package", rarity: "mythic", source: "🌇 Skyline Pulse" },
    { name: "🍽️ Michelin Dinner Series", rarity: "mythic", source: "🌇 Skyline Pulse" },
    { name: "🧖 Full Spa Immersion", rarity: "mythic", source: "🌇 Skyline Pulse" },
    { name: "📦 Luxury Living Experience", rarity: "mythic", source: "🌇 Skyline Pulse" },

    // Mythic Case
    { name: "📄 Cosmic Investment Form", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "🧪 Eternal Holdings Capsule", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "📦 Universal Ledger Box", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "🌠 Singular Crate Fragment", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "🌀 Continuum Account Sheet", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "🚀 Ultra Galaxy Case", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "📜 Mythic End Credit", rarity: "mythic", source: "🌌 Mythic Case" },
    { name: "🌌 Mythic Finale Core", rarity: "mythic", source: "🌌 Mythic Case" },

    // Legacy Endgame
    { name: "📁 First Edition Share Doc", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "📌 Finalized Agreement Clip", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "📜 Heirloom Trophy Deed", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "🪙 Stockpile Access Token", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "🏅 Champion’s Asset ID", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "🏻 Monument Title", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "📦 Prime Investor Case", rarity: "mythic", source: "🏆 Legacy Endgame" },
    { name: "🏆 Legacy Trophy Core", rarity: "mythic", source: "🏆 Legacy Endgame" },

    // The Millionaire’s Mark
    { name: "📜 Signature Wealth Contract", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "💼 Vault Ledger", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "📌 Platinum Permit", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "🧾 Confidential Asset Report", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "🪪 Luxury Owner’s License", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "🎩 Supreme Status Hat", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "🏦 Founder's Vault Key", rarity: "mythic", source: "💲 The Millionaire's Mark" },
    { name: "💲 The Millionaire’s Emblem", rarity: "mythic", source: "💲 The Millionaire's Mark" }
  ],
  reward: 0,
  badge: "mythiccompletionist"
},
];



export default sets;
