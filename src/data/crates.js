const crates = [
  {
    name: "Dumpster Dive Case",
    emoji: "🗑️",
    cost: 0,
    items: [
      { name: "🥫 Moldy Leftovers", value: 1 },
      { name: "📼 Sticky VHS Tape", value: 1 },
      { name: "🧤 Used Work Glove", value: 1 },
      { name: "🕶️ Cracked Sunglasses", value: 2 },
      { name: "📱 Old Phone", value: 2 },
      { name: "🔑 Worn Keychain", value: 3 },
      { name: "🐼 Panda Plushie", value: 4 },
      { name: "🎟️ Lottery Ticket", value: 5 },
    ],
  },
  {
    name: "Coin Flip Case",
    emoji: "🪙",
    cost: 1,
    items: [
      { name: "🧱 Useless Brick", value: 0 },
      { name: "🪙 Rusty Coin", value: 10 },
    ],
  },
  {
    name: "Garage Sale Case",
    emoji: "🏷️",
    cost: 3,
    items: [
      { name: "📼 Old VHS Tape", value: 1 },
      { name: "🧰 Tool Set", value: 2 },
      { name: "🧸 Worn Teddy", value: 4 },
      { name: "💿 Classic CD", value: 4 },
      { name: "🛴 Scooter", value: 6 },
      { name: "📚 Bookshelf", value: 12 },
      { name: "📿 Antique Necklace", value: 13 }
    ]
  },
  {
    name: "Junkyard Gems Case",
    emoji: "🛠️",
    cost: 5,
    items: [
      { name: "🧲 Broken Magnet", value: 1 },
      { name: "🔧 Screwdriver", value: 2 },
      { name: "🧱 Cinder Block", value: 3 },
      { name: "🪤 Mouse Trap", value: 5 },
      { name: "🧰 Toolbox", value: 6 },
      { name: "💡 Lightbulb", value: 12 },
      { name: "⚙️ Hubcap", value: 18 },
      { name: "🔋 Car Battery", value: 33 }
    ]
  },
  {
    name: "Budget Ballin' Case",
    emoji: "💵",
    cost: 10,
    items: [
      { name: "🧢 Cap", value: 1 },
      { name: "👕 Tee", value: 4 },
      { name: "🎧 Headphones", value: 6 },
      { name: "🎒 Satchel", value: 15 },
      { name: "👟 Kicks", value: 20 },
      { name: "💼 Briefcase", value: 24 },
      { name: "💸 Singles Stack", value: 27 },
      { name: "🪙 Gold Coin", value: 63 }
    ]
  },
  {
    name: "Skater's Deluxe",
    emoji: "🛹",
    cost: 15,
    items: [
      { name: "🧢 Beanie", value: 2 },
      { name: "👕 Thrasher Shirt", value: 6 },
      { name: "🛹 Fingerboard", value: 9 },
      { name: "🧼 Skate Wax", value: 11 },
      { name: "🧤 Grip Tape Gloves", value: 15 },
      { name: "👟 Worn Skate Shoes", value: 30 },
      { name: "🎧 Park Beats Headphones", value: 55 },
      { name: "🛹 Custom Deck Setup", value: 110 }
    ]
  },
  {
    name: "Flex Lottery",
    emoji: "💎",
    cost: 25,
    items: [
      { name: "🧢 Limited Snapback", value: 4 },
      { name: "👕 Streetwear Tee", value: 27 },
      { name: "💍 Fake Bling Ring", value: 32 },
      { name: "🧤 Designer Gloves", value: 36 },
      { name: "🎧 Over-Ear Flexphones", value: 38 },
      { name: "👟 Brand Collab Sneakers", value: 44 },
      { name: "👜 Hype Mini Bag", value: 89 },
      { name: "⛓️ Real Gold Chain", value: 130 }
    ]
  },
  {
    name: "Crypto Starter Pack",
    emoji: "📈",
    cost: 35,
    items: [
      { name: "🖱️ NFT Mousepad", value: 27 },
      { name: "💾 Ledger USB", value: 29 },
      { name: "🖼️ Mining Rig Poster", value: 41 },
      { name: "🧢 Web3 Cap", value: 46 },
      { name: "☕ Bear Market Mug", value: 73 },
      { name: "📉 Coin Tracker App", value: 110 },
      { name: "👕 I HODL Shirt", value: 120 },
      { name: "🪙 Rare Crypto Coin Replica", value: 120 }
    ]
  },
  {
    name: "Cartel Case",
    emoji: "💼",
    cost: 50,
    items: [
      { name: "🕶️ Dark Aviators", value: 13 },
      { name: "💼 Suspicious Briefcase", value: 19 },
      { name: "🧳 Leather Duffle", value: 71 },
      { name: "🚬 Cigar Pack", value: 94 },
      { name: "💵 Stack of Unmarked Bills", value: 100 },
      { name: "🧥 Imported Jacket", value: 140 },
      { name: "📱 Burner Phone", value: 170 },
      { name: "🚁 Helicopter Escape Key", value: 190 }
    ]
  },
  {
    name: "Designer Damage",
    emoji: "🧥",
    cost: 75,
    items: [
      { name: "🧢 Luxury Cap", value: 38 },
      { name: "🕶️ Premium Shades", value: 51 },
      { name: "👕 Gold Logo Hoodie", value: 53 },
      { name: "🧢 Monogram Belt", value: 55 },
      { name: "👟 Exclusive Sneakers", value: 140 },
      { name: "🧥 Silk Bomber", value: 240 },
      { name: "🧥 Street Flex Jacket", value: 260 },
      { name: "👜 Limited Designer Bag", value: 370 }
    ]
  },
  {
    "name": "Gold Rush",
    "emoji": "🏆",
    "cost": 1000,
    "items": [
      { "name": "👛 Gold-Plated Wallet", "value": 50 },
      { "name": "⛓️ 24k Chain", "value": 420 },
      { "name": "⌚ Gold Watch", "value": 450 },
      { "name": "🦷 Gold Grillz", "value": 700 },
      { "name": "🧥 Gilded Jacket", "value": 900 },
      { "name": "👟 Gold Sneakers", "value": 1800 },
      { "name": "💼 Luxury Gold Briefcase", "value": 1500 },
      { "name": "👑 Gold Throne", "value": 4700 }
    ],
    "style": {
      "gradient": "from-orange-500 via-amber-600 to-yellow-700",
      "glowColor": "amber"
    }
  },
  {
    name: "Luxury Gamble",
    emoji: "🎲",
    cost: 320,
    items: [
      { name: "💼 Executive Bag", value: 170 },
      { name: "🧴 Rare Cologne", value: 230 },
      { name: "💳 Platinum Card Holder", value: 240 },
      { name: "🤵 Custom Suit", value: 290 },
      { name: "🧥 Velvet Blazer", value: 380 },
      { name: "🥿 Gold-Tipped Loafers", value: 430 },
      { name: "⌚ High-End Smartwatch", value: 970 },
      { name: "💎 Handcrafted Diamond Sculpture", value: 2400 }
    ]
  },
  {
    name: "CEO Care Package",
    emoji: "💼",
    cost: 250,
    items: [
      { name: "📱 Monogrammed Tablet", value: 220 },
      { name: "🪴 Desk Zen Garden", value: 250 },
      { name: "☕ CEO Signature Mug", value: 270 },
      { name: "🪑 Wireless Executive Chair", value: 300 },
      { name: "⌨️ Gold Keyboard", value: 410 },
      { name: "✈️ Crypto Business Class Pass", value: 560 },
      { name: "📄 Company Buyout Contract", value: 1500 }
    ]
  },
  {
    name: "Diamond Dilemma",
    emoji: "💎",
    cost: 800,
    items: [
      { name: "💍 Diamond Ring", value: 470 },
      { name: "🧰 Luxury Engagement Box", value: 520 },
      { name: "🧤 Silver-Tipped Gloves", value: 860 },
      { name: "⌚ Crystal Watch", value: 1600 },
      { name: "🍾 Diamond-Studded Flask", value: 1600 },
      { name: "💎 Flawless Earring Pair", value: 1900 },
      { name: "🔷 Rare Blue Diamond Chip", value: 2200 },
      { name: "👑 Royalty Diamond Crown", value: 3700 }
    ]
  },
  {
    name: "Midnight Fortune",
    emoji: "🌙",
    cost: 600,
    items: [
      { name: "🕶️ Moonlit Shades", value: 290 },
      { name: "📿 Glow-in-the-Dark Necklace", value: 340 },
      { name: "🧥 Silk Night Robe", value: 610 },
      { name: "💳 Black Card Replica", value: 710 },
      { name: "💼 Neon City Briefcase", value: 800 },
      { name: "💍 Moonstone Ring", value: 1300 },
      { name: "🎫 VIP Rooftop Pass", value: 1500 },
      { name: "🔮 Fortune-Teller's Gold Orb", value: 4100 }
    ]
  },
  {
    "name": "Opulent Odds",
    "emoji": "💰",
    "cost": 1000,
    "items": [
      { "name": "👛 Designer Wallet Stack", "value": 730 },
      { "name": "🧳 Fine Leather Satchel", "value": 860 },
      { "name": "⌚ Black Gold Watch", "value": 950 },
      { "name": "🧥 Silk Cashmere Blend Coat", "value": 1100 },
      { "name": "💳 Diamond Card Holder", "value": 1200 },
      { "name": "🎟️ Private Club Invitation", "value": 1400 },
      { "name": "✈️ First Class Plane Ticket", "value": 1700 },
      { "name": "🏠 Estate Ownership Deed", "value": 2100 }
    ],
    "style": {
      "gradient": "from-orange-500 via-amber-600 to-yellow-700",
      "glowColor": "amber"
    }
  },
  {
  name: "Elite Access",
  emoji: "💼",
  cost: 500,
  items: [
    { name: "🎟️ Velvet Guest Pass", value: 59 },
    { name: "📇 Concierge Contact Card", value: 410 },
    { name: "🪢 Black Card Lanyard", value: 620 },
    { name: "🛎️ Personal Butler Token", value: 630 },
    { name: "🚪 Private Lounge Invite", value: 650 },
    { name: "🔑 Luxury Car Keyfob", value: 1200 },
    { name: "🥃 Whiskey Glass Set", value: 1900 },
    { name: "🌟 VIP Experience Voucher", value: 2500 }
  ]
},
  {
    name: "Royal Flush",
    emoji: "♠️",
    cost: 1200,
    items: [
      { name: "🟡 Diamond Poker Chip", value: 170 },
      { name: "🃏 Royal Card Deck", value: 200 },
      { name: "🎲 Gold Dice Set", value: 710 },
      { name: "🧿 Crown Cufflinks", value: 1000 },
      { name: "🍾 Casino Champagne", value: 1700 },
      { name: "👑 Velvet Throne Pass", value: 2200 },
      { name: "⌚ King’s Watch", value: 2600 },
      { name: "🏆 Royal Flush", value: 2900 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Ego Trip",
    emoji: "🪞",
    cost: 1500,
    items: [
      { name: "🛸 Selfie Drone", value: 150 },
      { name: "🪩 Polished Shoes", value: 950 },
      { name: "🖊️ Diamond Signature Pen", value: 1100 },
      { name: "💨 Ego Brand Cologne", value: 1800 },
      { name: "💡 Spotlight Ring Light", value: 1800 },
      { name: "🧴 Custom Perfume", value: 2100 },
      { name: "🏅 Personalized Trophy", value: 2500 },
      { name: "🪞 Golden Mirror Wall", value: 4000 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Vice City",
    emoji: "🦩",
    cost: 1750,
    items: [
      { name: "🕶️ Neon Aviators", value: 300 },
      { name: "🔑 Pink Convertible Key", value: 740 },
      { name: "📿 Club VIP Chain", value: 1300 },
      { name: "🦩 Golden Flamingo Statue", value: 1400 },
      { name: "🥿 Gator Skin Loafers", value: 1700 },
      { name: "📜 Retro Mansion Lease", value: 2100 },
      { name: "🎟️ Neon Yacht Ticket", value: 2800 },
      { name: "👑 Crime Lord’s Crown", value: 6400 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Silk Syndicate",
    emoji: "🧵",
    cost: 1600,
    items: [
      { name: "🧥 Satin Drape Robe", value: 240 },
      { name: "🩳 Monogram Lounge Shorts", value: 410 },
      { name: "🩰 Velvet Slippers", value: 700 },
      { name: "👑 Underground Crown", value: 1400 },
      { name: "🪞 Marble Vanity Mirror", value: 1500 },
      { name: "📿 Exotic Incense Pendant", value: 2700 },
      { name: "🍷 Secret Cellar Bottle", value: 3500 },
      { name: "💼 Syndicate Membership Card", value: 4800 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Heist",
    emoji: "🔦",
    cost: 2200,
    items: [
      { name: "🧤 Hacker's Gloves", value: 440 },
      { name: "📱 Burner Smartphone", value: 530 },
      { name: "🕶️ Infrared Shades", value: 1000 },
      { name: "🧳 Duffel Bag", value: 1700 },
      { name: "🔓 Vault Cracker", value: 1800 },
      { name: "💾 Encrypted Drive", value: 3200 },
      { name: "🚗 Silent Getaway Key", value: 6100 },
      { name: "💎 Glowing Diamond Cube", value: 6200 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Forbidden Fortune",
    emoji: "📿",
    cost: 2800,
    items: [
      { name: "🗝️ Ancient Tomb Key", value: 130 },
      { name: "📜 Lost City Scroll", value: 1000 },
      { name: "🪙 Smuggled Coin", value: 1400 },
      { name: "🧥 Cloak of Shadows", value: 2000 },
      { name: "🧿 Cursed Jewel", value: 2200 },
      { name: "💼 Contraband Case", value: 3000 },
      { name: "👑 Temple Heirloom", value: 7200 },
      { name: "🧳 Gold-Crested Relic Box", value: 10000 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Prestige Vault",
    emoji: "🏛️",
    cost: 3500,
    items: [
      { name: "📇 Executive ID Tag", value: 630 },
      { name: "💼 Prestige Folio", value: 860 },
      { name: "🖋️ Gold-Lined Contract", value: 890 },
      { name: "👓 Smart Recognition Glasses", value: 1700 },
      { name: "⌚ CEO Classic Timepiece", value: 3500 },
      { name: "🪑 Smart Recliner Pod", value: 5700 },
      { name: "🎓 Legacy Stock Certificate", value: 7300 },
      { name: "🏛️ Vault Access Keycard", value: 12900 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Opal Obsession",
    emoji: "🔮",
    cost: 1000,
    items: [
      { name: "💎 Pocket-Sized Opal", value: 8 },
      { name: "🔩 Dusty Ring Base", value: 230 },
      { name: "🧤 Gem Polishing Cloth", value: 680 },
      { name: "🧪 Color Infusion Flask", value: 1100 },
      { name: "📿 Shimmer Chain", value: 1300 },
      { name: "🪞 Mystic Compact Mirror", value: 1300 },
      { name: "📜 Legendary Appraisal Certificate", value: 2200 },
      { name: "💍 Blinding Soul Opal", value: 2800 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
{
    name: "Vaulted Vice",
    emoji: "🚪",
    cost: 1300,
    items: [
      { name: "🔑 Shady Room Key", value: 30 },
      { name: "📎 Confidential Paperclip", value: 630 },
      { name: "🧯 Broken Alarm Switch", value: 740 },
      { name: "🎧 Midnight Surveillance Tape", value: 850 },
      { name: "🧥 Guard Uniform", value: 1200 },
      { name: "🪤 Tripwire Toolkit", value: 1600 },
      { name: "🪞 One-Way Mirror Briefcase", value: 2500 },
      { name: "💼 Top Secret Vault Ticket", value: 4900 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Golden Mirage",
    emoji: "🏜️",
    cost: 2000,
    items: [
      { name: "🧻 Desert-Weathered Map", value: 200 },
      { name: "🪙 Sand-worn Coin", value: 1000 },
      { name: "📿 Mirage Necklace", value: 1400 },
      { name: "🧥 Oasis Duster", value: 1500 },
      { name: "🧴 Camel Hide Lotion", value: 1700 },
      { name: "🌵 Buried Treasure Crate", value: 3400 },
      { name: "🔑 Rusted Key to Riches", value: 4000 },
      { name: "🏜️ Temple of Gold Pass", value: 6000 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "After Hours",
    emoji: "🌃",
    cost: 2750,
    items: [
      { name: "🎟️ Secret Party Stub", value: 450 },
      { name: "💳 Black Market Card", value: 540 },
      { name: "🎧 Rooftop Mix Tape", value: 590 },
      { name: "🧥 Nightfall Hoodie", value: 2200 },
      { name: "📦 Unmarked Bottle Pack", value: 2800 },
      { name: "📸 VIP Snapshot Cam", value: 3600 },
      { name: "🔋 Energy Overdrive Brick", value: 4000 },
      { name: "🌃 Skyline Tower Access Code", value: 12100 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
  {
    name: "Corporate Chaos",
    emoji: "📊",
    cost: 3200,
    items: [
      { name: "🖇️ Unreadable Report", value: 81 },
      { name: "🧴 Stress Reduction Vial", value: 240 },
      { name: "📎 Overdue Expense Sheet", value: 1500 },
      { name: "💻 Infected USB Stick", value: 2300 },
      { name: "📉 Falling Stock Trophy", value: 2400 },
      { name: "🪞 Mysterious Boardroom Mirror", value: 4600 },
      { name: "📄 Golden Business Contract", value: 9200 },
      { name: "🏢 Corporate Raid Authorization", value: 10400 }
    ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
  },
{
  name: "Rich Rebellion",
  emoji: "🧨",
  cost: 4300,
  items: [
    { name: "🧢 Defiant Brand Cap", value: 2000 },
    { name: "🧯 Limited Protester Jacket", value: 2200 },
    { name: "📣 Diamond Megaphone", value: 1500 },
    { name: "📱 Burner Phone Gen-Z", value: 4800 },
    { name: "🙹 Hacked Hoverboard", value: 3300 },
    { name: "💾 Censored Vault File", value: 2600 },
    { name: "🩩 Private Drone Footage", value: 3100 },
    { name: "🧨 Revolutionary Crown", value: 20000 }
  ],
  style: {
    gradient: "from-orange-700 via-amber-500 to-yellow-400",
    glowColor: "amber"
  }
},
{
    name: "Gilded Gamble",
    emoji: "🥇",
    cost: 5500,
    items: [
      { name: "🥉 Bronze Vault Coin", value: 120 },
      { name: "🔩 Tarnished Pocket Trophy", value: 1200 },
      { name: "📌 Gilded Office Clip", value: 2800 },
      { name: "🧴 Collector’s Display Gloves", value: 2900 },
      { name: "📦 Gleam Stock Box", value: 3800 },
      { name: "💼 Heirloom Holder", value: 5600 },
      { name: "📿 Prestige Medal Chain", value: 12400 },
      { name: "🥇 Grand Prize Pedestal", value: 15200 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Blacklist Vault",
    emoji: "🔑",
    cost: 7000,
    items: [
      { name: "🧯 Failed Entry Form", value: 170 },
      { name: "🧴 Blackout Gloves", value: 1900 },
      { name: "🔍 Censored File Fragment", value: 3100 },
      { name: "🪣 Lockbreaker Chip", value: 5200 },
      { name: "💼 Shadow Briefcase", value: 5900 },
      { name: "📀 Encrypted Disk Drive", value: 10400 },
      { name: "📌 Redacted Tagline", value: 10600 },
      { name: "🔑 Vaultmaster Override Key", value: 18800 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Mythmaker's Case",
    emoji: "🐉",
    cost: 9500,
    items: [
      { name: "📖 Myth Scroll Fragment", value: 1800 },
      { name: "🪞 Reflective Legend Lens", value: 2800 },
      { name: "🐾 Dragon Hide Pouch", value: 3900 },
      { name: "🧪 Phoenix Resin Flask", value: 4900 },
      { name: "💍 Celestial Ring", value: 5900 },
      { name: "🪙 Divine Medallion", value: 13300 },
      { name: "📜 Epic Saga Contract", value: 14600 },
      { name: "🐉 Eternal Flame Crown", value: 28800 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Royal Treatment",
    emoji: "👑",
    cost: 12000,
    items: [
      { name: "🧻 Royal Napkin", value: 1300 },
      { name: "🍽️ State Dinner Plate", value: 1300 },
      { name: "💼 Crown Butler’s Bag", value: 9900 },
      { name: "🏃‍♂️ Embroidered Estate Slippers", value: 10000 },
      { name: "🧴 Crestmarked Gloves", value: 10400 },
      { name: "🪞 Throne Reflection Glass", value: 19700 },
      { name: "📜 Royalty Deed Certificate", value: 19800 },
      { name: "👑 King’s Retirement Throne", value: 23700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
    name: "Dream Sequence",
    emoji: "🌀",
    cost: 17000,
    items: [
      { name: "🪤 Sleep Loop Clip", value: 590 },
      { name: "💤 Static Memory Tag", value: 4200 },
      { name: "🕳️ Blank Thought Token", value: 6000 },
      { name: "🌫️ Subconscious Reel", value: 13500 },
      { name: "📀 Lucid Disk", value: 17400 },
      { name: "📡 Brainwave Beacon", value: 18000 },
      { name: "🩩 REM Resonator", value: 37300 },
      { name: "🌀 Infinite Dream Shard", value: 39000 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Endgame Lockbox",
    emoji: "🧢",
    cost: 25000,
    items: [
      { name: "🔩 First Piece", value: 1200 },
      { name: "📌 Second Signal", value: 3800 },
      { name: "🧩 Third Trigger", value: 10700 },
      { name: "📡 Fourth Phase Node", value: 19100 },
      { name: "📜 Fifth Echo Paper", value: 21600 },
      { name: "🔐 Sixth Layer Pass", value: 38400 },
      { name: "📀 Seventh Sequence Core", value: 39600 },
      { name: "🧢 Omega Reality Prism", value: 65600 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Executive Overload",
    emoji: "📠",
    cost: 6000,
    items: [
      { name: "📄 Crashed Printer Memo", value: 510 },
      { name: "🧃 Expired Breakroom Juice", value: 840 },
      { name: "📧 Broken Badge Clip", value: 3100 },
      { name: "📁 Overstuffed File Folder", value: 3100 },
      { name: "🖥️ CEO’s Burnout Rig", value: 5100 },
      { name: "📦 Confidential Crate", value: 6400 },
      { name: "🧳 Alpha Client Brief", value: 9800 },
      { name: "📠 90s Fax Jackpot", value: 19100 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Darkweb Delivery",
    emoji: "💻",
    cost: 7500,
    items: [
      { name: "📦 Suspicious USB Stick", value: 1200 },
      { name: "🔐 Ghost Login Device", value: 1400 },
      { name: "🧃 Unmarked Canister", value: 2000 },
      { name: "🧥 Blackhat Windbreaker", value: 5000 },
      { name: "📀 Encrypted Chip Pack", value: 5700 },
      { name: "📡 Redline WiFi Beacon", value: 10700 },
      { name: "🧳 Shady Server Box", value: 11900 },
      { name: "💻 Quantum Hack Terminal", value: 22100 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
    name: "Treasure Terminal",
    emoji: "🧾",
    cost: 10000,
    items: [
      { name: "🧾 Golden Receipt", value: 1600 },
      { name: "📜 Printed Relic Log", value: 2400 },
      { name: "📌 Bank-Stamped Invoice", value: 4400 },
      { name: "📀 Vault CD-ROM", value: 5600 },
      { name: "🔐 Lockbox Passcode Tape", value: 10900 },
      { name: "💼 Treasure Teller Case", value: 12800 },
      { name: "📦 Riches Terminal Pack", value: 18700 },
      { name: "🧾 Jackpot Redemption Scroll", value: 23500 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Legacy Box",
    emoji: "📓️",
    cost: 14000,
    items: [
      { name: "📄 Antique Insurance Form", value: 1300 },
      { name: "📌 Rusted Paperclip", value: 1600 },
      { name: "🖖 Vault ID Tag", value: 3100 },
      { name: "📦 Locked Timebox", value: 9400 },
      { name: "🪪 Outdated ID Card", value: 13800 },
      { name: "🧳 Ancestral Case File", value: 19300 },
      { name: "💼 Trust Fund Binder", value: 28600 },
      { name: "📓️ Generational Jackpot Box", value: 34800 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Galactic Gamble",
    emoji: "🪐",
    cost: 18000,
    items: [
      { name: "🧪 Alien Dust Capsule", value: 4100 },
      { name: "📡 Cracked Probe Receiver", value: 6400 },
      { name: "🚀 Orbital Drive Fragment", value: 9100 },
      { name: "📀 Stolen Satellite Disk", value: 10500 },
      { name: "🔋 Solar Reactor Core", value: 13000 },
      { name: "🪐 Dwarf Star Pendant", value: 26100 },
      { name: "📦 Meteorite Shard Pack", value: 30000 },
      { name: "🌌 Intergalactic Crown", value: 44900 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Fortune Finale",
    emoji: "🎇",
    cost: 24000,
    items: [
      { name: "🎉 Firecracker Stick", value: 2000 },
      { name: "🎁 Celebration Tag", value: 8700 },
      { name: "💌 Invitation to Luck", value: 15200 },
      { name: "🧸 Boomstarter Box", value: 19600 },
      { name: "🎆 Finale Countdown Sheet", value: 21500 },
      { name: "📜 Vault Closer Contract", value: 27300 },
      { name: "🎇 End-of-Line Badge", value: 47800 },
      { name: "🎉 Ultimate Payday Ticket", value: 49800 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
    name: "Jackpot Jungle",
    emoji: "🌴",
    cost: 9500,
    items: [
      { name: "🍃 Leafy Mystery Tag", value: 2200 },
      { name: "🪱 Jungle Dud Token", value: 4100 },
      { name: "🐾 Tracker Print Plate", value: 6100 },
      { name: "🧥 Safari Windbreaker", value: 9600 },
      { name: "🪣 Exotic Crate Cracker", value: 9700 },
      { name: "🎒 Rare Jungle Pack", value: 12600 },
      { name: "📜 Hidden Temple Scroll", value: 15000 },
      { name: "🌴 Jackpot Totem Crown", value: 16700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Vault Eclipse",
    emoji: "🌑",
    cost: 16000,
    items: [
      { name: "💿 Corrupted Shadow Disc", value: 4200 },
      { name: "🔒 Disabled Moon Lock", value: 5300 },
      { name: "🔌 Eclipse Power Fragment", value: 5800 },
      { name: "🛡️ Cloaked Vault Pass", value: 10500 },
      { name: "🌒 Orbital Reroute Protocol", value: 13500 },
      { name: "📁 Blackout Asset Case", value: 13500 },
      { name: "🔮 Lunar Encryption Core", value: 19400 },
      { name: "🌑 Eclipse Protocol Archive", value: 55700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Omni Crate",
    emoji: "🎯",
    cost: 23000,
    items: [
      { name: "🃏 Trick Coin", value: 1800 },
      { name: "🎧 Dual-Signal Headset", value: 3000 },
      { name: "🔗 Glitched Inventory Key", value: 6800 },
      { name: "📄 Fake Receipt", value: 12000 },
      { name: "🎬 Limited Edition Mask", value: 35700 },
      { name: "📦 Multi-Identity Briefcase", value: 39900 },
      { name: "🎯 Identity Swapper Rig", value: 40000 },
      { name: "🎲 Omni Prize Core", value: 44800 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
    name: "Final Fortune",
    emoji: "🎰",
    cost: 30000,
    items: [
      { name: "🎫 Burned Ticket Stub", value: 1500 },
      { name: "🪙 Casino Coin Fragment", value: 1600 },
      { name: "🎲 Scuffed Dice Set", value: 7000 },
      { name: "🧾 Expired Claim Slip", value: 9400 },
      { name: "🎩 Velvet Bet Cap", value: 17700 },
      { name: "📦 Cashout Safe", value: 24300 },
      { name: "💼 Jackpot Handbag", value: 33300 },
      { name: "🎰 Final Pull Token", value: 97300 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Celestial Vault",
    emoji: "🌌",
    cost: 50000,
    items: [
      { name: "🪐 Gravity Chip", value: 12300 },
      { name: "🌠 Starfall Receipt", value: 17800 },
      { name: "🚀 Busted Drone Capsule", value: 21800 },
      { name: "🐀 Moon Base Disk", value: 23500 },
      { name: "📡 Galaxy Router", value: 24100 },
      { name: "🫊 Quantum Core Crate", value: 40000 },
      { name: "📦 Nebula Vault Case", value: 59000 },
      { name: "🌌 Celestial Jackpot Core", value: 121500 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Infinity Bundle",
    emoji: "♾️",
    cost: 75000,
    items: [
      { name: "♻️ Endless Token", value: 49 },
      { name: "📟 Null Data Pager", value: 21800 },
      { name: "🪞 Eternal Mirage Lens", value: 31300 },
      { name: "🧳 Storage Continuum Pack", value: 42900 },
      { name: "🔁 Loop Network Core", value: 63700 },
      { name: "🎞️ Infinity Film Drive", value: 77200 },
      { name: "💀 Timefold Crate", value: 94100 },
      { name: "♾️ Infinite Winnings Sphere", value: 149000 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
{
    name: "Ghost Market",
    emoji: "👻",
    cost: 100000,
    items: [
      { name: "📉 Vanishing Order Slip", value: 35300 },
      { name: "💾 Redacted Black Key", value: 40600 },
      { name: "📦 Cloaked Crate", value: 47400 },
      { name: "🖥️ Disconnected Database Rig", value: 49800 },
      { name: "👤 Phantom Buyer Tag", value: 59600 },
      { name: "📜 Hex Market Scroll", value: 69200 },
      { name: "💼 Ghost Wallet", value: 123100 },
      { name: "👻 Lost Ledger of Riches", value: 215100 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Hall of Riches",
    emoji: "🏛️",
    cost: 150000,
    items: [
      { name: "🧾 Ancient Wealth Permit", value: 1200 },
      { name: "📜 Forgotten Treasure Deed", value: 23200 },
      { name: "🏺 Museum Artifact Vault", value: 41400 },
      { name: "📦 Platinum Plinth Box", value: 83200 },
      { name: "💼 Treasury Vault Contract", value: 110900 },
      { name: "👑 Imperial Holder Case", value: 158100 },
      { name: "🎖️ First Edition Stock Stamp", value: 167200 },
      { name: "🏛️ Hall of Riches Seal", value: 374900 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Cosmic Closure",
    emoji: "🌠",
    cost: 200000,
    items: [
      { name: "🧠 Memory Chip Fragment", value: 3000 },
      { name: "🪙 Black Hole Coin", value: 38000 },
      { name: "📡 Comet Trail Sensor", value: 48500 },
      { name: "🔭 Observatory Key", value: 60100 },
      { name: "🚀 Gravity Forge Crate", value: 75300 },
      { name: "🌌 Stellar Lockbox", value: 171500 },
      { name: "📀 Parallel Time Disc", value: 238200 },
      { name: "🌠 Cosmic Closure Core", value: 645200 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Heirloom Cache",
    emoji: "🧬",
    cost: 32000,
    items: [
      { name: "📜 Family Record Scroll", value: 4400 },
      { name: "💎 Tarnished Crest Gem", value: 10200 },
      { name: "📦 Heirloom Dust Box", value: 16600 },
      { name: "🎩 Ancestor's Cap", value: 17600 },
      { name: "📌 Forgotten Deed Fragment", value: 21800 },
      { name: "🧳 Velvet Archive Briefcase", value: 28100 },
      { name: "📁 Inheritance File", value: 37400 },
      { name: "🧬 Genetic Fortune Core", value: 68600 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
{
    name: "Cursed Riches",
    emoji: "🫿",
    cost: 48000,
    items: [
      { name: "🫿 Cracked Protection Charm", value: 0 },
      { name: "📄 Cursed Ledger Sheet", value: 0 },
      { name: "🪙 Phantom Coin", value: 3300 },
      { name: "📦 Forgotten Treasure Chest", value: 21900 },
      { name: "🧥 Haunting Robe", value: 45400 },
      { name: "📜 Bound Contract", value: 46600 },
      { name: "🧳 Profane Briefcase", value: 50000 },
      { name: "🪬 Soul-Bound Gold Core", value: 140100 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Monarch Vault",
    emoji: "👑",
    cost: 90000,
    items: [
      { name: "📌 Royal Registry Tag", value: 880 },
      { name: "🧾 Monarch Ledger", value: 11000 },
      { name: "🎖️ House Crest Insignia", value: 33000 },
      { name: "🔐 Broken Throne Key", value: 33800 },
      { name: "🪞 Crown Polishing Cloth", value: 55000 },
      { name: "📜 Rulebook of Kings", value: 99500 },
      { name: "💼 Dynasty Control Case", value: 100500 },
      { name: "👑 Supreme Crown of Value", value: 242300 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Timeless Crate",
    emoji: "⏳",
    cost: 110000,
    items: [
      { name: "📦 Dusty Crate Shard", value: 14400 },
      { name: "⌛ Stolen Hourglass", value: 38300 },
      { name: "📜 Forgotten Archive Page", value: 54700 },
      { name: "🕰️ Locked Chrono Device", value: 59100 },
      { name: "🔮 Moment Mirror", value: 73500 },
      { name: "📁 Eternal Receipt", value: 74100 },
      { name: "🧽 Time Capsule Vault", value: 114700 },
      { name: "⏳ End of Time Core", value: 275200 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
  {
    name: "Vault of the Void",
    emoji: "🕳️",
    cost: 160000,
    items: [
      { name: "📄 Blank Entry Form", value: 14300 },
      { name: "📌 Null Entry Permit", value: 16100 },
      { name: "📦 Empty Holding Box", value: 31100 },
      { name: "🪞 Reflective Nothing Tag", value: 47900 },
      { name: "🔒 Locked Abyss Lockbox", value: 86500 },
      { name: "🧳 Endless Loop Case", value: 144800 },
      { name: "💀 Echo Shard", value: 207800 },
      { name: "🕳️ Singularity Core", value: 475500 }
    ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
  },
{
  name: "Golden Exit",
  emoji: "🚪",
  cost: 200000,
  items: [
    { name: "🚪 Gold-Lined Doorframe", value: 4400 },
    { name: "🫄 Clean Slate Plaque", value: 5600 },
    { name: "📜 Final Note", value: 6500 },
    { name: "🪙 Golden Paradox Coin", value: 7200 },
    { name: "💼 The Last Briefcase", value: 118500 },
    { name: "🎓 Winner's Envelope", value: 151300 },
    { name: "🔑 Exit Key Deluxe", value: 172400 },
    { name: "🏁 Golden Exit Portal", value: 814000 }
  ],
  style: {
    gradient: "from-amber-600 via-yellow-400 to-amber-600",
    glowColor: "amber",
    extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
  }
},
{
  name: "The Millionaire's Mark",
  emoji: "💲",
  cost: 500000,
  items: [
    { name: "📜 Signature Wealth Contract", value: 183400 },
    { name: "💼 Vault Ledger", value: 131100 },
    { name: "📌 Platinum Permit", value: 14100 },
    { name: "🧾 Confidential Asset Report", value: 251200 },
    { name: "🪪 Luxury Owner’s License", value: 294700 },
    { name: "🎩 Supreme Status Hat", value: 359300 },
    { name: "🏦 Founder's Vault Key", value: 471400 },
    { name: "💲 The Millionaire’s Emblem", value: 1000000 }
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},
{
  name: "Legacy Endgame",
  emoji: "🏆",
  cost: 750000,
  items: [
    { name: "📁 First Edition Share Doc", value: 3160 },
    { name: "📌 Finalized Agreement Clip", value: 130 },
    { name: "📜 Heirloom Trophy Deed", value: 1500 },
    { name: "🪙 Stockpile Access Token", value: 493300 },
    { name: "🏅 Champion’s Asset ID", value: 417000 },
    { name: "🏻 Monument Title", value: 946300 },
    { name: "📦 Prime Investor Case", value: 476500 },
    { name: "🏆 Legacy Trophy Core", value: 2004300 }
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},
{
  name: "Mythic Case",
  emoji: "🌌",
  cost: 1000000,
  items: [
    { name: "📄 Cosmic Investment Form", value: 2840 },
    { name: "🧪 Eternal Holdings Capsule", value: 3750 },
    { name: "📦 Universal Ledger Box", value: 1679 },
    { name: "🌠 Singular Crate Fragment", value: 630900 },
    { name: "🌀 Continuum Account Sheet", value: 490900 },
    { name: "🚀 Ultra Galaxy Case", value: 942600 },
    { name: "📜 Mythic End Credit", value: 697400 },
    { name: "🌌 Mythic Finale Core", value: 3000000 }
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},


];

export default crates;
