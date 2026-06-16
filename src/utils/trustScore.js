/**
 * trustScore.js — backward-compat re-exports.
 * All logic now lives in trustEngine.js.
 */
export { getScoreColor, getRiskLabel, runFullAnalysis } from './trustEngine.js';

// Legacy alias — some pages use getTrustLabel
export function getTrustLabel(score) {
  if (score >= 90) return { label: 'Trusted',       color: '#22C55E' };
  if (score >= 70) return { label: 'Good',           color: '#06B6D4' };
  if (score >= 50) return { label: 'Needs Review',   color: '#F59E0B' };
  return            { label: 'High Risk',            color: '#EF4444' };
}

// Legacy — no longer random, calls real engine
export { runFullAnalysis as simulateAnalysis } from './trustEngine.js';
export function calculateTrustScore({ completeness, descriptionQuality, duplicateRisk, suspiciousRisk }) {
  return Math.round(completeness * 0.4 + descriptionQuality * 0.3 + (100 - duplicateRisk) * 0.2 + (100 - suspiciousRisk) * 0.1);
}
