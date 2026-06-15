/**
 * duplicateDetector.js — FIX #9
 * Compares listing title against mock marketplace DB using
 * bigram (Dice coefficient) string similarity — no randomness.
 */

// Mock marketplace database for comparison
const MARKETPLACE_DB = [
  { id: 1,  title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',  category: 'Audio',         price: 299 },
  { id: 2,  title: 'Sony WH1000XM5 Headphones Black',                        category: 'Audio',         price: 270 },
  { id: 3,  title: 'Apple iPhone 15 Pro 256GB Natural Titanium',              category: 'Mobile Phones', price: 999 },
  { id: 4,  title: 'iPhone 15 Pro 256 GB Titanium Unlocked',                  category: 'Mobile Phones', price: 960 },
  { id: 5,  title: 'Samsung Galaxy S24 Ultra 512GB Phantom Black',            category: 'Mobile Phones', price: 1199 },
  { id: 6,  title: 'Samsung S24 Ultra 512GB Android Smartphone',              category: 'Mobile Phones', price: 1150 },
  { id: 7,  title: 'Apple MacBook Air M3 13 inch Space Gray 8GB 256GB',       category: 'Laptops',       price: 1099 },
  { id: 8,  title: 'MacBook Air M3 2024 13" SpaceGray',                       category: 'Laptops',       price: 1089 },
  { id: 9,  title: 'Dell XPS 15 9530 Intel Core i9 RTX 4060',                 category: 'Laptops',       price: 1499 },
  { id: 10, title: 'Dell XPS 15 9530 i9 32GB 1TB OLED',                      category: 'Laptops',       price: 1549 },
  { id: 11, title: 'Sony PlayStation 5 Console Disc Edition',                 category: 'Gaming',        price: 499  },
  { id: 12, title: 'Apple iPad Pro 12.9 M2 256GB WiFi Space Gray',            category: 'Tablets',       price: 1099 },
  { id: 13, title: 'Bose QuietComfort 45 Wireless Headphones',                category: 'Audio',         price: 229  },
  { id: 14, title: 'Canon EOS R6 Mark II Mirrorless Camera Body',             category: 'Cameras',       price: 2499 },
  { id: 15, title: 'DJI Mini 3 Pro Drone with RC Controller',                 category: 'Electronics',   price: 759  },
];

/** Build bigrams from a string */
function bigrams(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const set = new Set();
  for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
  return set;
}

/** Dice coefficient similarity 0-1 */
function diceCoefficient(a, b) {
  const biA = bigrams(a);
  const biB = bigrams(b);
  if (biA.size === 0 && biB.size === 0) return 1;
  if (biA.size === 0 || biB.size === 0) return 0;
  let intersection = 0;
  for (const bg of biA) { if (biB.has(bg)) intersection++; }
  return (2 * intersection) / (biA.size + biB.size);
}

/**
 * Find duplicate matches for a listing title.
 * @param {string} title  - user's product name
 * @returns {{ matches, highestSimilarity, duplicateRisk }}
 */
export function detectDuplicates(title) {
  if (!title?.trim()) {
    return { matches: [], highestSimilarity: 0, duplicateRisk: 0 };
  }

  const scored = MARKETPLACE_DB.map(item => ({
    ...item,
    similarity: Math.round(diceCoefficient(title, item.title) * 100),
  }));

  // Only keep meaningful matches
  const matches = scored
    .filter(m => m.similarity >= 40)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);

  const highestSimilarity = matches.length > 0 ? matches[0].similarity : 0;

  // Duplicate risk 0-100
  let duplicateRisk = 0;
  if (highestSimilarity >= 85)      duplicateRisk = 80 + Math.round((highestSimilarity - 85) * (20 / 15));
  else if (highestSimilarity >= 65) duplicateRisk = 40 + Math.round((highestSimilarity - 65) * (40 / 20));
  else if (highestSimilarity >= 40) duplicateRisk = 10 + Math.round((highestSimilarity - 40) * (30 / 25));

  return {
    matches,
    highestSimilarity,
    duplicateRisk: Math.min(duplicateRisk, 100),
  };
}
