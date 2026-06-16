/**
 * scoringEngine.js — Rule-based scoring (no randomness)
 * FIX #1: Replaces the old random-score simulateAnalysis()
 */

const SPEC_KEYWORDS = [
  'specification', 'spec', 'dimension', 'weight', 'resolution', 'processor',
  'cpu', 'gpu', 'ram', 'storage', 'battery', 'display', 'screen', 'inch',
  'gb', 'tb', 'mhz', 'ghz', 'mah', 'watt', 'connectivity', 'bluetooth',
  'wi-fi', 'wifi', 'usb', 'hdmi', 'port', 'hz', 'fps', 'mp', 'megapixel',
  'core', 'thread', 'bandwidth', 'capacity', 'voltage', 'ampere',
];

/**
 * Compute description quality score 0-100 using explicit rules.
 * Maximum points:
 *   +20  length > 100
 *   +20  length > 200
 *   +10  specifications detected
 *   +10  brand present in form
 *   +10  model present in form
 *   +10  warranty present in form
 *   +10  condition present in form
 *   +10  product age present in form
 * Total = 100
 */
export function scoreDescription(formData) {
  const desc = (formData.description || '').toLowerCase();
  const breakdown = {};
  let score = 0;

  // Length bonuses
  if (desc.length > 100) { score += 20; breakdown.length100 = 20; }
  if (desc.length > 200) { score += 20; breakdown.length200 = 20; }

  // Specifications detected in description text
  const hasSpecs = SPEC_KEYWORDS.some(kw => desc.includes(kw));
  if (hasSpecs) { score += 10; breakdown.specifications = 10; }

  // Form field presence
  if (formData.brand?.trim())     { score += 10; breakdown.brand = 10; }
  if (formData.model?.trim())     { score += 10; breakdown.model = 10; }
  if (formData.warranty?.trim() && formData.warranty !== 'No Warranty') {
    score += 10; breakdown.warranty = 10;
  }
  if (formData.condition?.trim()) { score += 10; breakdown.condition = 10; }
  if (formData.age?.trim())       { score += 10; breakdown.productAge = 10; }

  return { descriptionQuality: Math.min(score, 100), breakdown };
}

/**
 * Compute listing completeness 0-100.
 * Each present field contributes its weight.
 */
export function scoreCompleteness(formData) {
  const FIELDS = [
    { key: 'productName', label: 'Product Name',  weight: 15 },
    { key: 'category',    label: 'Category',       weight: 10 },
    { key: 'brand',       label: 'Brand',          weight: 10 },
    { key: 'model',       label: 'Model',          weight: 10 },
    { key: 'condition',   label: 'Condition',      weight: 10 },
    { key: 'age',         label: 'Product Age',    weight: 5  },
    { key: 'warranty',    label: 'Warranty',       weight: 10 },
    { key: 'description', label: 'Description',    weight: 15 },
    { key: 'images',      label: 'Images',         weight: 15 },
  ];

  let score = 0;
  const presentFields = [];
  const missingFields = [];

  for (const field of FIELDS) {
    const val = formData[field.key];
    const present =
      field.key === 'images'
        ? Array.isArray(val) && val.length > 0
        : typeof val === 'string' && val.trim().length > 0;

    if (present) {
      score += field.weight;
      presentFields.push(field.label);
    } else {
      missingFields.push({ field: field.label, weight: field.weight });
    }
  }

  return { completeness: Math.min(score, 100), missingFields, presentFields };
}
