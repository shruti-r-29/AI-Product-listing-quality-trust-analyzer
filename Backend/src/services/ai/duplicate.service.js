import { MARKETPLACE_DB } from '../../data/marketplace.db.js';

function bigrams(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const set = new Set();
  for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
  return set;
}

function diceCoefficient(a, b) {
  const biA = bigrams(a);
  const biB = bigrams(b);
  if (biA.size === 0 && biB.size === 0) return 1;
  if (biA.size === 0 || biB.size === 0) return 0;
  let intersection = 0;
  for (const bg of biA) { if (biB.has(bg)) intersection++; }
  return (2 * intersection) / (biA.size + biB.size);
}

export function detectDuplicates(title) {
  if (!title?.trim()) {
    return { matches: [], highestSimilarity: 0, duplicateRisk: 0 };
  }

  const scored = MARKETPLACE_DB.map((item) => ({
    ...item,
    similarity: Math.round(diceCoefficient(title, item.title) * 100),
  }));

  const matches = scored
    .filter((m) => m.similarity >= 40)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);

  const highestSimilarity = matches.length > 0 ? matches[0].similarity : 0;

  let duplicateRisk = 0;
  if (highestSimilarity >= 85) duplicateRisk = 80 + Math.round((highestSimilarity - 85) * (20 / 15));
  else if (highestSimilarity >= 65) duplicateRisk = 40 + Math.round((highestSimilarity - 65) * (40 / 20));
  else if (highestSimilarity >= 40) duplicateRisk = 10 + Math.round((highestSimilarity - 40) * (30 / 25));

  return {
    matches,
    highestSimilarity,
    duplicateRisk: Math.min(duplicateRisk, 100),
  };
}
