/**
 * trustEngine.js — FIX #2
 * Deterministic trust scoring. No Math.random() anywhere.
 *
 * Formula:
 *   40% Completeness
 *   30% Description Quality
 *   20% Duplicate Safety  (100 - duplicateRisk)
 *   10% Suspicious Safety (100 - suspiciousScore)
 *
 * Trust Levels:
 *   90-100 → Trusted
 *   70-89  → Good
 *   50-69  → Needs Review
 *   <50    → High Risk
 */
import { scoreDescription, scoreCompleteness } from './scoringEngine.js';
import { detectSuspiciousContent } from './suspiciousDetector.js';
import { detectDuplicates } from './duplicateDetector.js';
import { checkCompleteness } from './completenessChecker.js';
import { generateSuggestions } from './suggestionEngine.js';

export function getTrustLevel(score) {
  if (score >= 90) return { level: 'Trusted',      color: '#22C55E', bg: '#22C55E18' };
  if (score >= 70) return { level: 'Good',          color: '#06B6D4', bg: '#06B6D418' };
  if (score >= 50) return { level: 'Needs Review',  color: '#F59E0B', bg: '#F59E0B18' };
  return            { level: 'High Risk',           color: '#EF4444', bg: '#EF444418' };
}

export function getScoreColor(score) {
  if (score >= 80) return '#22C55E';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

export function getRiskLabel(score) {
  if (score <= 20) return { label: 'Low',    color: '#22C55E' };
  if (score <= 50) return { label: 'Medium', color: '#F59E0B' };
  return            { label: 'High',   color: '#EF4444' };
}

/**
 * Full deterministic analysis pipeline.
 * @param {object} formData - wizard form data
 * @returns full analysis result object
 */
export function runFullAnalysis(formData) {
  // 1. Individual engines
  const { descriptionQuality, breakdown: descBreakdown } = scoreDescription(formData);
  const { completenessScore, missingFields, presentFields, completenessLevel } = checkCompleteness(formData);
  const { suspiciousScore, riskLevel: suspiciousRiskLevel, suspiciousTerms, allPatterns } = detectSuspiciousContent(formData.description);
  const { matches: duplicateMatches, highestSimilarity, duplicateRisk } = detectDuplicates(formData.productName);
  const suggestions = generateSuggestions(formData, { descriptionQuality, completenessScore, duplicateRisk, suspiciousScore });

  // 2. Weighted trust score
  const trustScore = Math.round(
    completenessScore   * 0.40 +
    descriptionQuality  * 0.30 +
    (100 - duplicateRisk)  * 0.20 +
    (100 - suspiciousScore) * 0.10
  );

  const { level: trustLevel, color: trustColor, bg: trustBg } = getTrustLevel(trustScore);

  // 3. Radar chart data
  const radarData = [
    { subject: 'Completeness', A: completenessScore,          fullMark: 100 },
    { subject: 'Description',  A: descriptionQuality,         fullMark: 100 },
    { subject: 'Images',       A: (formData.images?.length || 0) >= 3 ? 90 : (formData.images?.length || 0) * 30, fullMark: 100 },
    { subject: 'Safety',       A: 100 - suspiciousScore,      fullMark: 100 },
    { subject: 'Trust',        A: trustScore,                 fullMark: 100 },
    { subject: 'Uniqueness',   A: 100 - duplicateRisk,        fullMark: 100 },
  ];

  return {
    // Core scores
    trustScore,
    trustLevel,
    trustColor,
    trustBg,
    completeness:        completenessScore,
    completenessLevel,
    descriptionQuality,
    descBreakdown,
    duplicateRisk,
    highestSimilarity,
    suspiciousRisk:      suspiciousScore,
    suspiciousRiskLevel,

    // Detailed results
    missingFields,
    presentFields,
    suspiciousTerms,
    allPatterns,
    duplicateMatches,
    suggestions,
    radarData,

    // Meta
    analysedAt: new Date().toISOString(),
    listingName: formData.productName || 'Untitled',
  };
}
