// src/utils/generateFatePack.js
import fateCards from "../data/fatecards";
import powerCards from "../data/powercards";
import choiceCards from "../data/choicecards";

const rarityWeights = {
  basic: 50,
  sturdy: 30,
  noble: 20,
  mythic: 10,
  rare: 30,
  epic: 20,
  legendary: 5,
  choice: 20, // Equal weighting for choice cards
};

const rarityMap = {
  basic: (card) => card.type === "regular" && card.value >= 2 && card.value <= 5,
  sturdy: (card) => card.type === "regular" && card.value >= 6 && card.value <= 10,
  noble: (card) => card.type === "regular" && card.value >= 11 && card.value <= 13,
  mythic: (card) => card.type === "regular" && card.value === 14,
  rare: (card) => card.type === "power" && card.rarity === "rare",
  epic: (card) => card.type === "power" && card.rarity === "epic",
  legendary: (card) => card.type === "power" && card.rarity === "legendary",
  choice: (card) => card.type === "choice",
};

const getWeightedCardPool = () => {
  const allCards = [...fateCards, ...powerCards, ...choiceCards];
  const pools = {
    basic: [],
    sturdy: [],
    noble: [],
    mythic: [],
    rare: [],
    epic: [],
    legendary: [],
    choice: [],
  };

  for (const card of allCards) {
    for (const [rarity, test] of Object.entries(rarityMap)) {
      if (test(card)) {
        pools[rarity].push(card);
        break;
      }
    }
  }

  return pools;
};

const getRandomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getWeightedRandomCard = (pools) => {
  const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
  const rand = Math.random() * totalWeight;
  let sum = 0;

  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    sum += weight;
    if (rand < sum) {
      const pool = pools[rarity];
      return getRandomFrom(pool);
    }
  }
};

const generateFatePack = (cardCount = 5) => {
  const pools = getWeightedCardPool();
  const pack = [];

  for (let i = 0; i < cardCount; i++) {
    const card = getWeightedRandomCard(pools);
    pack.push(card);
  }

  return { pack };
};

export default generateFatePack;
