/**
 * suggestionEngine.js — FIX #7
 * Generates context-aware suggestions from actual form data & scores.
 */

/**
 * @param {object} formData   - the wizard form data
 * @param {object} analysis   - { completeness, descriptionQuality, duplicateRisk, suspiciousScore }
 * @returns {Array<{ id, text, priority, category }>}
 */
export function generateSuggestions(formData, analysis) {
  const suggestions = [];
  let id = 1;

  const desc = formData.description || '';
  const imageCount = Array.isArray(formData.images) ? formData.images.length : 0;

  // ── Description suggestions ──────────────────────────────────────────
  if (!desc.trim()) {
    suggestions.push({ id: id++, category: 'description', priority: 'high',
      text: 'Add a product description — listings without descriptions score 0 on quality.' });
  } else if (desc.length < 100) {
    suggestions.push({ id: id++, category: 'description', priority: 'high',
      text: `Expand your description (currently ${desc.length} chars). Aim for at least 100 characters to unlock quality scoring.` });
  } else if (desc.length < 200) {
    suggestions.push({ id: id++, category: 'description', priority: 'medium',
      text: 'Your description is decent — adding another 100+ characters with specs and usage history would push your score higher.' });
  }

  const descLower = desc.toLowerCase();
  const specKeywords = ['specification', 'spec', 'dimension', 'weight', 'processor', 'display', 'battery', 'storage', 'ram', 'cpu', 'gpu'];
  const hasSpecs = specKeywords.some(k => descLower.includes(k));
  if (!hasSpecs && desc.length > 0) {
    suggestions.push({ id: id++, category: 'description', priority: 'medium',
      text: 'Add technical specifications (dimensions, weight, processor, storage, battery life) to significantly improve quality scores.' });
  }

  // ── Image suggestions ─────────────────────────────────────────────────
  if (imageCount === 0) {
    suggestions.push({ id: id++, category: 'images', priority: 'high',
      text: 'Upload at least 3 product images. Listings with images are 3× more likely to be trusted by buyers.' });
  } else if (imageCount < 3) {
    suggestions.push({ id: id++, category: 'images', priority: 'high',
      text: `You have ${imageCount} image(s). Upload at least 3 photos — front, back, and close-up of any wear or damage.` });
  } else if (imageCount < 5) {
    suggestions.push({ id: id++, category: 'images', priority: 'low',
      text: 'Consider uploading 5+ images including all accessories to maximise buyer confidence.' });
  }

  // ── Missing fields ────────────────────────────────────────────────────
  if (!formData.warranty?.trim() || formData.warranty === 'No Warranty') {
    suggestions.push({ id: id++, category: 'completeness', priority: 'medium',
      text: "Add warranty information — even 'No Warranty' is better than leaving it blank as it sets accurate buyer expectations." });
  }
  if (!formData.brand?.trim()) {
    suggestions.push({ id: id++, category: 'completeness', priority: 'high',
      text: 'Specify the brand — buyers search and filter by brand, and omitting it reduces your listing visibility.' });
  }
  if (!formData.model?.trim()) {
    suggestions.push({ id: id++, category: 'completeness', priority: 'high',
      text: 'Add the model number — it eliminates ambiguity and is the first thing a knowledgeable buyer checks.' });
  }
  if (!formData.age?.trim()) {
    suggestions.push({ id: id++, category: 'completeness', priority: 'low',
      text: 'Mention how long you have owned the product to establish provenance and build trust.' });
  }
  if (!formData.condition?.trim()) {
    suggestions.push({ id: id++, category: 'completeness', priority: 'high',
      text: 'Select the condition grade — it is the second thing every buyer looks at and directly affects trust scoring.' });
  }

  // ── Suspicious content suggestions ───────────────────────────────────
  if (analysis?.suspiciousScore > 0) {
    suggestions.push({ id: id++, category: 'trust', priority: 'high',
      text: 'Your description contains flagged phrases. Remove any off-platform contact requests or payment instructions to clear the suspicious content warning.' });
  }

  // ── Duplicate risk suggestions ────────────────────────────────────────
  if (analysis?.duplicateRisk > 60) {
    suggestions.push({ id: id++, category: 'duplicate', priority: 'medium',
      text: 'Your listing title is very similar to existing listings. Make the title more unique by adding the condition, color, or included accessories.' });
  }

  // ── Title suggestion ──────────────────────────────────────────────────
  const titleLen = (formData.productName || '').length;
  if (titleLen > 0 && titleLen < 20) {
    suggestions.push({ id: id++, category: 'description', priority: 'medium',
      text: 'Expand your listing title to at least 20 characters — include brand, model, key feature, and condition.' });
  }

  // Sort: high → medium → low
  const order = { high: 0, medium: 1, low: 2 };
  suggestions.sort((a, b) => order[a.priority] - order[b.priority]);

  return suggestions;
}
