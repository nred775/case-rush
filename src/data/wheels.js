const wheels = [
  {
    name: "Welcome Spin",
    emoji: "🎁",
    cost: 0,
    items: [
      { name: "📎 Binder Clip", value: 1 },
      { name: "🧷 Safety Pin", value: 2 },
      { name: "🖍️ Broken Crayon", value: 3 },
      { name: "🩹 Old Bandage", value: 4 },
      { name: "📏 Mini Ruler", value: 5 },
      { name: "🧃 Juice Box", value: 6 },
      { name: "📘 Notebook", value: 8 }
    ],
  },
  {
    name: "Pocket Finds",
    emoji: "👖",
    cost: 1,
    items: [
      { name: "🪙 Button", value: 0 },
      { name: "🍬 Lint-Covered Candy", value: 1 },
      { name: "🧻 Receipt", value: 1 },
      { name: "🖊️ Half-Dried Pen", value: 2 },
      { name: "🔑 Toy Key", value: 2 },
      { name: "💌 Crumpled Note", value: 3 },
      { name: "📱 Toy Phone", value: 5 }
    ]
  },
  {
    name: "Locker Loot",
    emoji: "🏫",
    cost: 3,
    items: [
      { name: "📎 Paper Clip Chain", value: 1 },
      { name: "🧃 Expired Juice", value: 2 },
      { name: "📓 Doodled Notebook", value: 3 },
      { name: "🔑 Lost Locker Key", value: 4 },
      { name: "🧼 Soap Bar in Wrapper", value: 5 },
      { name: "📼 Secret VHS", value: 6 },
      { name: "📀 Burned Mixtape", value: 21 }
    ]
  },
  {
    name: "Pet Store Spin",
    emoji: "🐾",
    cost: 5,
    items: [
      { name: "🦴 Chew Toy", value: 1 },
      { name: "🐟 Fish Flakes", value: 2 },
      { name: "🦜 Bird Mirror", value: 3 },
      { name: "🐹 Hamster Wheel", value: 4 },
      { name: "🐶 Collar Tag", value: 5 },
      { name: "🛁 Pet Bath Kit", value: 6 },
      { name: "🐕 Leash & Harness Set", value: 49 }
    ]
  },
  {
    name: "Dorm Room Raffle",
    emoji: "🛏️",
    cost: 7,
    items: [
      { name: "🍜 Instant Noodles", value: 1 },
      { name: "🧦 Mismatched Socks", value: 2 },
      { name: "📺 Mini TV Remote", value: 3 },
      { name: "🧃 Spill-Proof Tumbler", value: 4 },
      { name: "📡 WiFi Extender", value: 5 },
      { name: "💡 LED Strip Lights", value: 6 },
      { name: "🧼 Desktop Fan Diffuser", value: 77 }
    ]
  },
  {
    name: "Snack Attack",
    emoji: "🍪",
    cost: 10,
    items: [
      { name: "🍬 Loose Mints", value: 6 },
      { name: "🍿 Bag of Popcorn", value: 9 },
      { name: "🍪 Cookie Twin-Pack", value: 10 },
      { name: "🍫 King-Sized Candy Bar", value: 13 },
      { name: "🥤 Custom Slush Cup", value: 16 },
      { name: "🥡 Takeout Credit", value: 22 },
      { name: "🎂 Birthday Cake Voucher", value: 64 }
    ]
  },
  {
    name: "Thrift Store Finds",
    emoji: "🏷️",
    cost: 50,
    items: [
      { name: "📺 Retro TV Remote", value: 41 },
      { name: "📚 Dusty Book Set", value: 42 },
      { name: "🎮 Old Game Controller", value: 73 },
      { name: "🖼️ Framed Cat Poster", value: 88 },
      { name: "🧣 Vintage Scarf", value: 96 },
      { name: "🎵 Vinyl Record Crate", value: 100 },
      { name: "🎻 Worn Violin Case", value: 260 }
    ]
  },
  {
    name: "College Essentials",
    emoji: "📚",
    cost: 100,
    items: [
      { name: "🖊️ Bulk Pens Pack", value: 49 },
      { name: "📓 Graph Paper Notebook", value: 53 },
      { name: "☕ Coffee Gift Card", value: 140 },
      { name: "💻 Laptop Stand", value: 160 },
      { name: "🖱️ Wireless Mouse", value: 250 },
      { name: "🎧 Study Headphones", value: 270 },
      { name: "🎒 Academic Backpack", value: 480 }
    ]
  },
  {
    name: "Gamer Fuel Wheel",
    emoji: "⚡",
    cost: 250,
    items: [
      { name: "🥤 Energy Drink", value: 1 },
      { name: "🍕 Pizza Voucher", value: 91 },
      { name: "🎮 Thumb Grips Pack", value: 230 },
      { name: "🖥️ RGB Mousepad", value: 350 },
      { name: "🎧 Chat Mic", value: 400 },
      { name: "👕 Branded Gamer Tee", value: 1000 },
      { name: "🖱️ Pro Gaming Mouse", value: 1400 }
    ]
  },
  {
    name: "Weekend Trip",
    emoji: "🧳",
    cost: 500,
    items: [
      { name: "🧦 Travel Sock Set", value: 96 },
      { name: "🪥 Toiletry Kit", value: 120 },
      { name: "📱 Charging Bank", value: 620 },
      { name: "🎧 Noise Canceling Earbuds", value: 750 },
      { name: "🎒 Daypack", value: 860 },
      { name: "🎫 Hotel Gift Card", value: 1100 },
      { name: "🧳 Carry-On Luggage", value: 3400 }
    ]
  },
  {
    name: "Meme Market",
    emoji: "📈",
    cost: 900,
    items: [
      { name: "🧻 NFT Toilet Paper", value: 51 },
      { name: "🦍 HODL Shirt", value: 210 },
      { name: "🖼️ Laser Eyes Portrait", value: 670 },
      { name: "🧠 Meme Course eBook", value: 1100 },
      { name: "📉 Broken Chart Sculpture", value: 2000 },
      { name: "📦 Doge Care Package", value: 2100 },
      { name: "📈 Meme Stonk Figurine", value: 6500 }
    ]
  },
  {
    name: "Streaming Setup",
    emoji: "🎥",
    cost: 750,
    items: [
      { name: "🧢 Streamer Hat", value: 440 },
      { name: "🎙️ Desk Mic", value: 720 },
      { name: "📷 Webcam", value: 840 },
      { name: "💡 Key Light", value: 950 },
      { name: "🎧 Monitoring Headphones", value: 1700 },
      { name: "🖥️ Stream Deck", value: 2700 },
      { name: "🪑 Ergonomic Chair", value: 3100 }
    ]
  },
  {
    name: "Travel Tech",
    emoji: "✈️",
    cost: 150,
    items: [
      { name: "🔌 Adapter Brick", value: 23 },
      { name: "🎧 Noise-Cancel Buds", value: 40 },
      { name: "📱 Universal Charger", value: 140 },
      { name: "🎒 Travel Pouch", value: 310 },
      { name: "🔋 Battery Brick", value: 430 },
      { name: "📷 Action Cam", value: 570 },
      { name: "💼 Flight-Safe Tech Case", value: 600 }
    ]
  },
  {
    name: "Sneaker Shuffle",
    emoji: "👟",
    cost: 700,
    items: [
      { name: "🧦 Limited Socks Pack", value: 620 },
      { name: "🧽 Sneaker Cleaner Kit", value: 830 },
      { name: "🎨 Custom Laces", value: 880 },
      { name: "🧢 Sneaker Hat Collab", value: 1100 },
      { name: "📦 Collector’s Box", value: 1600 },
      { name: "👟 Hype Drop Pair", value: 1900 },
      { name: "👟 Ultra-Limited Pair", value: 2900 }
    ]
  },
  {
    name: "Creator's Corner",
    emoji: "🧠",
    cost: 300,
    items: [
      { name: "📒 Sketch Pad", value: 110 },
      { name: "🖌️ Brush Pack", value: 360 },
      { name: "🖼️ Mini Canvas Set", value: 360 },
      { name: "🧷 Craft Supply Box", value: 360 },
      { name: "🧠 Creativity Course", value: 500 },
      { name: "💡 Premium Idea Board", value: 1200 },
      { name: "📹 DIY Creator Rig", value: 1300 }
    ]
  },
  {
    name: "Luxury Desk Setup",
    emoji: "🖥️",
    cost: 1000,
    items: [
      { name: "🖊️ Premium Pen Set", value: 12 },
      { name: "🧴 Desk Cleaner Kit", value: 180 },
      { name: "📘 Leather Notebook", value: 650 },
      { name: "🪑 Memory Foam Chair", value: 1000 },
      { name: "⌨️ Mechanical Keyboard", value: 1500 },
      { name: "🖥️ UltraWide Monitor", value: 1900 },
      { name: "💼 Executive Desk Package", value: 3200 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Studio Stash",
    emoji: "🎶",
    cost: 1000,
    items: [
      { name: "🎚️ Mixer Pad", value: 98 },
      { name: "🎧 Engineer Headphones", value: 490 },
      { name: "📀 Sample Library", value: 500 },
      { name: "🎤 Studio Mic", value: 590 },
      { name: "🎹 Mini Synth", value: 2100 },
      { name: "🧪 Plugin Bundle", value: 2200 },
      { name: "🎛️ Full Studio Rack", value: 2400 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "VIP Event Kit",
    emoji: "🎟️",
    cost: 2000,
    items: [
      { name: "👕 Limited Merch Drop", value: 150 },
      { name: "📸 Polaroid w/ Celebrity", value: 400 },
      { name: "🎧 Exclusive Playlist", value: 440 },
      { name: "🎫 Tier 2 Pass", value: 2100 },
      { name: "🪩 Private Lounge Entry", value: 3400 },
      { name: "🥂 Backstage Toast", value: 3500 },
      { name: "🎟️ Golden Lanyard Invite", value: 6800 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Creator Lab Pro",
    emoji: "🧪",
    cost: 4000,
    items: [
      { name: "📘 Branding Guide", value: 1800 },
      { name: "📷 DSLR Camera", value: 2800 },
      { name: "🖥️ Editing Monitor", value: 4100 },
      { name: "📦 Content Prop Kit", value: 5000 },
      { name: "🛒 E-Commerce Builder", value: 5600 },
      { name: "📹 Pro Rig Bundle", value: 6900 },
      { name: "🧪 Full Studio Launch", value: 7400 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Office Overhaul",
    emoji: "🪑",
    cost: 1900,
    items: [
      { name: "🖊️ Smart Pen", value: 180 },
      { name: "🧻 Cable Organizer", value: 350 },
      { name: "🧯 Air Purifier", value: 1400 },
      { name: "🪑 Ergonomic Chair", value: 1800 },
      { name: "📦 Productivity Bundle", value: 2200 },
      { name: "📈 Smart Whiteboard", value: 4700 },
      { name: "🧠 AI Task Manager", value: 5300 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Content Creation Kit",
    emoji: "📸",
    cost: 2000,
    items: [
      { name: "📘 Viral Hooks eBook", value: 160 },
      { name: "💡 Lighting Rig", value: 280 },
      { name: "🎙️ Podcast Mic", value: 350 },
      { name: "🧢 Branded Merch Pack", value: 1200 },
      { name: "📸 Pro Camera", value: 2800 },
      { name: "📦 Creator Toolbox", value: 4000 },
      { name: "📹 Editing Suite License", value: 8000 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Collector",
    emoji: "🗃️",
    cost: 1800,
    items: [
      { name: "🧢 Signed Hat", value: 520 },
      { name: "📦 Mystery Figure", value: 720 },
      { name: "🎮 Retro Game Box", value: 740 },
      { name: "🖼️ Limited Art Print", value: 1700 },
      { name: "📘 Graded Comic", value: 2000 },
      { name: "🧃 Collector’s Glass Set", value: 3000 },
      { name: "🗃️ Grail Item Vaulted", value: 6400 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Digital Hustle Pack",
    emoji: "💼",
    cost: 3000,
    items: [
      { name: "📒 Monetization Playbook", value: 87 },
      { name: "🖱️ Smart Clicker", value: 400 },
      { name: "🧮 Ad Revenue Calculator", value: 2200 },
      { name: "📈 Analytics Suite", value: 3100 },
      { name: "💻 Landing Page Builder", value: 3700 },
      { name: "💳 Sub Manager Tool", value: 4200 },
      { name: "💼 Business Starter Vault", value: 11500 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Creator Cave",
    emoji: "🏕️",
    cost: 1200,
    items: [
      { name: "🧢 Personalized Hat", value: 81 },
      { name: "💡 Smart Ring Light", value: 530 },
      { name: "📘 Creative Prompt Deck", value: 850 },
      { name: "🎙️ Condenser Mic", value: 960 },
      { name: "📦 Setup Toolkit", value: 1500 },
      { name: "🪑 Custom Chair Embroidery", value: 1800 },
      { name: "🎥 Full Vlog Setup", value: 4300 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Digital Drop",
    emoji: "📦",
    cost: 1700,
    items: [
      { name: "🪙 Hype Coin Pack", value: 67 },
      { name: "📱 Mobile Studio App", value: 870 },
      { name: "💻 Site Generator Credit", value: 1600 },
      { name: "📦 Bundle of Resources", value: 1600 },
      { name: "🖼️ Exclusive Digital Art", value: 1700 },
      { name: "🔑 Alpha Access Pass", value: 3200 },
      { name: "📦 Limited Vault Drop", value: 5200 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Jet Set Starter",
    emoji: "🌍",
    cost: 1750,
    items: [
      { name: "🧳 Travel Organizer", value: 140 },
      { name: "🪪 Passport Case", value: 420 },
      { name: "📸 Compact Camera", value: 1600 },
      { name: "🎧 Flight Comfort Kit", value: 1900 },
      { name: "🏨 2-Night Hotel Voucher", value: 2000 },
      { name: "✈️ Airline Credit", value: 4200 },
      { name: "🌍 Trip Planning Bundle", value: 4400 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Flex Stream",
    emoji: "📺",
    cost: 4500,
    items: [
      { name: "🎧 Custom Channel Sound Pack", value: 3000 },
      { name: "🎨 Animated Overlay Set", value: 4100 },
      { name: "📦 Stream Deck Mini", value: 4400 },
      { name: "🎙️ Audio Mixer", value: 5600 },
      { name: "📸 Face Cam Pro", value: 5800 },
      { name: "🖥️ Dual Monitor Mount Kit", value: 7300 },
      { name: "📺 Signature Broadcast Vault", value: 7500 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Side Hustle Stack",
    emoji: "💡",
    cost: 1200,
    items: [
      { name: "📓 Guide to Passive Income", value: 440 },
      { name: "📱 Task Management App Pro", value: 580 },
      { name: "📈 Startup Blueprint Deck", value: 610 },
      { name: "📦 Product Samples Box", value: 960 },
      { name: "💳 Ad Budget Credit", value: 1000 },
      { name: "🧮 Tax Tools Bundle", value: 1700 },
      { name: "💼 Automated Business Suite", value: 4800 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Influencer Ready",
    emoji: "📱",
    cost: 2200,
    items: [
      { name: "🧼 LED Glow Light", value: 110 },
      { name: "📘 Trending Hashtag Guide", value: 270 },
      { name: "🎒 Aesthetic Backpack", value: 620 },
      { name: "📱 Clip-On Phone Camera", value: 1200 },
      { name: "💄 Beauty Collab Kit", value: 3000 },
      { name: "🎥 Brand Promo Voucher", value: 4600 },
      { name: "📱 Viral Content Setup", value: 8600 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Gadget Grab Bag",
    emoji: "🧰",
    cost: 4900,
    items: [
      { name: "🔌 Smart Plug Kit", value: 1400 },
      { name: "📦 Cable Management System", value: 2200 },
      { name: "📱 Budget Phone", value: 4000 },
      { name: "💡 Smart Bulbs Pack", value: 5000 },
      { name: "🧰 Home Tech Toolbox", value: 6000 },
      { name: "🖥️ Productivity Monitor", value: 11000 },
      { name: "🔋 Full Gadget Bundle", value: 11500 }
    ],
    style: {
      gradient: "from-orange-700 via-amber-500 to-yellow-400",
      glowColor: "amber"
    }
  },
  {
    name: "Pop Culture",
    emoji: "🌟",
    cost: 5000,
    items: [
      { name: "🎬 Movie Poster (Signed)", value: 850 },
      { name: "🎧 Classic Album Vinyl", value: 3600 },
      { name: "📼 VHS Collector’s Edition", value: 4300 },
      { name: "📸 Paparazzi Candid", value: 4800 },
      { name: "🧢 Celebrity Merch Drop", value: 5300 },
      { name: "🎤 Golden Microphone Replica", value: 5500 },
      { name: "📀 Platinum Record Plaque", value: 10700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Gamer God Gear",
    emoji: "🕹️",
    cost: 8000,
    items: [
      { name: "🎧 Esports Headset", value: 4000 },
      { name: "⌨️ RGB Keyboard", value: 4000 },
      { name: "🖱️ Pro Mouse Bundle", value: 4300 },
      { name: "🖥️ Curved Monitor", value: 7900 },
      { name: "🧃 Energy Supply Crate", value: 11200 },
      { name: "🎮 Console with Skin", value: 12300 },
      { name: "📦 Full Setup Starter Pack", value: 12400 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Luxury Fashion Drop",
    emoji: "👗",
    cost: 12000,
    items: [
      { name: "🧣 Designer Scarf", value: 1000 },
      { name: "👜 Mini Handbag", value: 3600 },
      { name: "👟 Collab Sneakers", value: 4100 },
      { name: "👓 Fashion Sunglasses", value: 6400 },
      { name: "💄 Couture Makeup Kit", value: 8700 },
      { name: "👔 Runway Fit", value: 23400 },
      { name: "🧥 Statement Coat", value: 36900 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
 {
    name: "Legend Lore",
    emoji: "🛡️",
    cost: 18000,
    items: [
      { name: "⚔️ Hero’s Temple Blade", value: 890 },
      { name: "🔫 Galactic Smuggler’s Blaster", value: 1100 },
      { name: "🛡️ Liberty Defender Shield", value: 6000 },
      { name: "🦾 Arc-Powered Gauntlet", value: 12100 },
      { name: "🧙‍♂️ Wizard’s Oak Staff", value: 30300 },
      { name: "🦇 Nocturnal Vigilant Tools", value: 36500 },
      { name: "💍 Enchanted Ring of Ages", value: 39000 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Tech Titan",
    emoji: "🤖",
    cost: 25000,
    items: [
      { name: "🔋 Smartwatch", value: 4900 },
      { name: "🎧 Noise Canceling Over-Ears", value: 6000 },
      { name: "📱 Foldable Smartphone", value: 20400 },
      { name: "🖥️ 4K Creative Monitor", value: 21200 },
      { name: "📷 DSLR Kit", value: 23800 },
      { name: "💻 Ultrabook", value: 36100 },
      { name: "🧠 AI Workstation", value: 62700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Neon Breakroom",
    emoji: "🧃",
    cost: 6000,
    items: [
      { name: "☕ Retro Espresso Machine", value: 1700 },
      { name: "🥤 Smart Mini Fridge", value: 1900 },
      { name: "📺 Looping Breaktime TV", value: 3900 },
      { name: "🎧 Lo-Fi Sound Hub", value: 4400 },
      { name: "🛋️ Modular Lounge Seat", value: 5100 },
      { name: "💡 Mood Lighting Grid", value: 6400 },
      { name: "📦 Productivity Recharge Pack", value: 18700 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Garage Gold",
    emoji: "🔧",
    cost: 7000,
    items: [
      { name: "🔩 Magnetic Tool Tray", value: 1600 },
      { name: "🧰 Custom Tool Chest", value: 3700 },
      { name: "🚗 Diecast Drift Car", value: 6000 },
      { name: "🔦 LED Work Light", value: 6100 },
      { name: "🧼 Garage Detailing Kit", value: 7400 },
      { name: "🛠️ Mechanic’s Power Set", value: 10900 },
      { name: "🧪 High-Performance Bundle", value: 13300 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
    name: "Studio Mode",
    emoji: "🎛️",
    cost: 10000,
    items: [
      { name: "🎧 Audio Engineer Cans", value: 1800 },
      { name: "🎤 Pop Filter Mic", value: 4900 },
      { name: "💡 Ambient Lighting Panel", value: 6400 },
      { name: "🎹 Compact MIDI Pad", value: 7400 },
      { name: "🖥️ Ultra HD Monitor", value: 14500 },
      { name: "🎚️ Producer’s Touch Console", value: 15500 },
      { name: "📦 Creative Master Rig", value: 19600 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Future Fit",
    emoji: "🧬",
    cost: 15000,
    items: [
      { name: "⌚ Smart Fitness Watch", value: 820 },
      { name: "🥼 Biotech Compression Gear", value: 6100 },
      { name: "🎧 Immersive Workout Headphones", value: 13800 },
      { name: "🏃 Motion Tracker Shoes", value: 14700 },
      { name: "🧃 Recovery Drink Pack", value: 16600 },
      { name: "🛋️ In-Home Trainer Console", value: 16900 },
      { name: "🧠 AI Fitness System", value: 36100 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Hype Terminal",
    emoji: "🛰️",
    cost: 24000,
    items: [
      { name: "🧢 Signature Drop Cap", value: 5600 },
      { name: "🎧 Crystal Sound Set", value: 7100 },
      { name: "📱 Collab Smart Device", value: 18000 },
      { name: "👟 Streetwear Icon Pair", value: 23500 },
      { name: "🖥️ Creator Series Display", value: 34400 },
      { name: "📦 Cloud Flex Bundle", value: 39500 },
      { name: "🚀 Ultra Limited Launch Kit", value: 39900 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
  {
    name: "Signal Boost",
    emoji: "📡",
    cost: 5000,
    items: [
      { name: "📱 Signal Amplifier", value: 1700 },
      { name: "🔋 Mobile Power Stack", value: 3100 },
      { name: "🖥️ External Display Hub", value: 3500 },
      { name: "🎧 Wireless Pod Set", value: 5000 },
      { name: "🧳 Portable Creator Bag", value: 6700 },
      { name: "📶 Dual Band Router", value: 7000 },
      { name: "💼 Full Comm Kit", value: 8100 }
    ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
  },
{
  name: "Loft Drop",
  emoji: "🏙️",
  cost: 8000,
  items: [
    { name: "🛋️ Lounge Bean Seat", value: 4000 },
    { name: "💡 Hanging Neon Art", value: 5300 },
    { name: "🎧 Vibe Speaker Bar", value: 6700 },
    { name: "🖼️ Wall Grid Display", value: 8000 },
    { name: "🧴 Aesthetic Organizer Kit", value: 9300 },
    { name: "📺 Studio Smart Screen", value: 10700 },
    { name: "📦 Creative Space Setup", value: 12000 },
  ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
},
{
  name: "Heat Check",
  emoji: "🔥",
  cost: 10000,
  items: [
    { name: "👟 Retro Sneaker Pack", value: 5400 },
    { name: "🧢 Heatwave Collab Cap", value: 6700 },
    { name: "🕶️ Glare Reflectors", value: 8100 },
    { name: "🎽 Premium Sport Fit", value: 9400 },
    { name: "🎧 Urban Audio Rig", value: 12100 },
    { name: "📦 Hypebox Special", value: 13500 },
    { name: "🧥 Streetwear Drop Set", value: 14800 },
  ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
},
{
  name: "Pixel Loadout",
  emoji: "🧠",
  cost: 15000,
  items: [
    { name: "⌨️ Pro Keyboard Deck", value: 7300 },
    { name: "🎧 Gaming Comm System", value: 10200 },
    { name: "📱 Game Companion Tablet", value: 13100 },
    { name: "🖱️ Speed Sensor Mouse", value: 14600 },
    { name: "🖥️ Frame-Packed Monitor", value: 17500 },
    { name: "🎮 Elite Controller Kit", value: 20400 },
    { name: "📦 Full Meta Loadout", value: 21900 },
  ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
},
{
  name: "Cloud Cart",
  emoji: "☁️",
  cost: 20000,
  items: [
    { name: "📲 Smart Device Stack", value: 11400 },
    { name: "📸 Lifestyle Capture Kit", value: 14300 },
    { name: "💻 Creator Cloudbook", value: 17100 },
    { name: "🧠 Sync Assistant Core", value: 20000 },
    { name: "📦 Instant Studio Starter", value: 22900 },
    { name: "🖥️ Workstation Frame", value: 25700 },
    { name: "☁️ Ultimate Cloud Core", value: 28600 },
  ],
  style: {
    gradient: "from-purple-900 via-fuchsia-700 to-purple-950",
    glowColor: "purple"
  }
},
{
    name: "Boardroom Bundle",
    emoji: "📊",
    cost: 30000,
    items: [
      { name: "🖊️ Luxury Pen Set", value: 600 },
      { name: "📘 Executive Notebook", value: 160 },
      { name: "🪑 Ergonomic Command Chair", value: 21400 },
      { name: "🖥️ Quad Monitor Setup", value: 26600 },
      { name: "📦 Strategy Suite Kit", value: 32000 },
      { name: "💼 Business Elite Package", value: 100000 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Crypto Loadout",
    emoji: "🪙",
    cost: 50000,
    items: [
      { name: "🔐 Cold Wallet Vault", value: 17500 },
      { name: "💻 Mining Lite Rig", value: 23400 },
      { name: "📈 Charting Display System", value: 29200 },
      { name: "📚 Web3 Guide Library", value: 35000 },
      { name: "💸 Token Credit Drop", value: 46600 },
      { name: "🧠 AI Trading Assistant", value: 58300 },
      { name: "📦 Full Digital Hustler Kit", value: 70000 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Creative Empire",
    emoji: "🏰",
    cost: 75000,
    items: [
      { name: "📸 Cinematic Camera Rig", value: 33400 },
      { name: "🖥️ 8K Ultra Editing Station", value: 40000 },
      { name: "🎧 Mastering Headphones", value: 46600 },
      { name: "🎙️ Broadcast Mic Setup", value: 53400 },
      { name: "📦 Production Studio Set", value: 66600 },
      { name: "💡 Ambient Light Grid", value: 80000 },
      { name: "🎞️ Scene Director Bundle", value: 100000 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Designer Dream",
    emoji: "👑",
    cost: 120000,
    items: [
      { name: "👠 Custom Label Heels", value: 44800 },
      { name: "👜 Signature Fashion Bag", value: 59700 },
      { name: "👓 Haute Couture Frames", value: 74700 },
      { name: "👕 Collab Drop Ensemble", value: 89600 },
      { name: "🧥 Runway Ready Outerwear", value: 104500 },
      { name: "📦 Full Style Creator Kit", value: 119500 },
      { name: "👑 Exclusive Crown Piece", value: 179200 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "World Tour",
    emoji: "🌎",
    cost: 200000,
    items: [
      { name: "🛫 First-Class Ticket Pair", value: 86200 },
      { name: "🏨 Luxury Resort Stay", value: 103400 },
      { name: "🗺️ VIP Tour Package", value: 120600 },
      { name: "🎫 Exclusive Concert Passes", value: 137800 },
      { name: "📦 Cultural Experience Kit", value: 155100 },
      { name: "💼 Jetsetter's Essentials Set", value: 172300 },
      { name: "🌎 Global Explorer Experience", value: 344600 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Launch Lab",
    emoji: "🚀",
    cost: 36000,
    items: [
      { name: "💡 Startup Toolkit", value: 7200 },
      { name: "🧠 Branding Masterclass", value: 10800 },
      { name: "📱 Marketing App Stack", value: 13000 },
      { name: "💻 Pitch Deck Generator", value: 30300 },
      { name: "📦 Founder’s Bundle", value: 40500 },
      { name: "🏗️ Product Prototype Credit", value: 41900 },
      { name: "📈 Growth Accelerator Access", value: 57800 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Tech Spire",
    emoji: "🖥️",
    cost: 40000,
    items: [
      { name: "🧠 AI Assistant Hub", value: 17500 },
      { name: "🖥️ Multi-Screen Workstation", value: 23300 },
      { name: "📡 Smart Networking Kit", value: 29100 },
      { name: "🎧 Immersive Sound System", value: 34900 },
      { name: "💾 Cloud Power Storage", value: 40700 },
      { name: "📦 Advanced Dev Kit", value: 46500 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Studio Royale",
    emoji: "🎬",
    cost: 65000,
    items: [
      { name: "📸 Flagship Creator Camera", value: 31400 },
      { name: "🎤 Studio Mic Duo", value: 37700 },
      { name: "💡 Full Light Control Kit", value: 43900 },
      { name: "📺 Production Display", value: 50200 },
      { name: "🖥️ Ultra Render Rig", value: 56500 },
      { name: "📦 Content Overload Kit", value: 62800 },
      { name: "🎛️ Editor’s Dream Setup", value: 81600 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Overtime Drip",
    emoji: "💼",
    cost: 100000,
    items: [
      { name: "🧥 Premium Officewear Pack", value: 39100 },
      { name: "⌚ Prestige Smartwatch", value: 52100 },
      { name: "📦 Power Lunch Kit", value: 65100 },
      { name: "🪑 Designer Desk Setup", value: 78100 },
      { name: "💻 Enterprise Laptop", value: 91200 },
      { name: "🎧 Focus Headphones", value: 104200 },
      { name: "📈 Business Strategy Pack", value: 130200 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Next Gen",
    emoji: "🧬",
    cost: 175000,
    items: [
      { name: "🧠 Bio-Sync Wearables", value: 71500 },
      { name: "🦾 Neural Fitness Rig", value: 85800 },
      { name: "📱 Adaptive Smart Devices", value: 100100 },
      { name: "🔋 Quantum Charger Pack", value: 114500 },
      { name: "🛋️ Personal Health Capsule", value: 143100 },
      { name: "📦 Evolutionary Living Kit", value: 214600 },
      { name: "🧬 Future Tech Core", value: 250400 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Dream Grid",
    emoji: "🧠",
    cost: 85000,
    items: [
      { name: "💡 Smart Light System", value: 36500 },
      { name: "🛏️ AI Sleep Setup", value: 48700 },
      { name: "📺 Mood Wall Display", value: 60900 },
      { name: "🪩 Relaxation Audio Shell", value: 73100 },
      { name: "📦 Peace & Productivity Set", value: 85300 },
      { name: "🧠 Neural Rest Hub", value: 103500 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
  {
    name: "Momentum Kit",
    emoji: "🏎️",
    cost: 140000,
    items: [
      { name: "🧤 Pro Racing Gloves", value: 44400 },
      { name: "👟 Grip-Boost Shoes", value: 59200 },
      { name: "🎧 Engine Sound Simulator", value: 74000 },
      { name: "📸 Onboard Cam System", value: 103500 },
      { name: "🛞 Sim Racing Frame", value: 133100 },
      { name: "🧠 Reaction Time Trainer", value: 162700 },
      { name: "🏁 Performance Launch Pack", value: 207100 }
    ],
    style: {
      gradient: "from-amber-600 via-yellow-400 to-amber-600",
      glowColor: "amber",
      extraClasses: "ring-4 ring-yellow-300 ring-offset-2 shadow-[0_0_60px_rgba(255,215,0,0.9)]"
    }
  },
   {
  name: "Skyline Pulse",
  emoji: "🌇",
  cost: 500000,
  items: [
    { name: "🏙️ Penthouse Weekend Stay", value: 250 },
    { name: "📸 Helicopter Photo Tour", value: 300 },
    { name: "🛋️ Designer Suite Package", value: 400 },
    { name: "🍽️ Michelin Dinner Series", value: 55000 },
    { name: "🧖 Full Spa Immersion", value: 200000 },
    { name: "📦 Luxury Living Experience", value: 2000000 }, // Jackpot
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},
{
  name: "Code Black",
  emoji: "💻",
  cost: 750000,
  items: [
    { name: "🧠 AI Research Workstation", value: 350 },
    { name: "💾 Cloud Datacenter Credits", value: 450 },
    { name: "🖥️ Dev Tower Build", value: 600 },
    { name: "🔐 Quantum Encryption Module", value: 70000 },
    { name: "📦 Full Hacker Suite", value: 150000 },
    { name: "👾 Live Coding Arena Access", value: 3000000 }, // Jackpot
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},
{
  name: "Starlight Run",
  emoji: "🪐",
  cost: 1000000,
  items: [
    { name: "🛰️ Suborbital Flight Ticket", value: 500 },
    { name: "🧑‍🚀 Zero-Gravity Training", value: 600 },
    { name: "🌠 Astronaut Night Tour", value: 750 },
    { name: "🔭 Stargazer Elite Setup", value: 85000 },
    { name: "🛏️ Deep Sleep Capsule", value: 100000 },
    { name: "📦 Space Adventure Gear", value: 200000 },
    { name: "🪐 Edge of Orbit Access", value: 5000000 }, // Jackpot
  ],
  style: {
    gradient: "from-purple-700 via-pink-600 to-fuchsia-700",
    glowColor: "fuchsia",
    extraClasses: "ring-4 ring-pink-400 ring-offset-2 shadow-[0_0_40px_rgba(255,105,180,0.8)]"
  }
},
];
export default wheels;