import { scoreDescription } from './scoring.service.js';
import { checkCompleteness } from './completeness.service.js';
import { detectSuspicious } from './suspicious.service.js';
import { detectDuplicates } from './duplicate.service.js';
import { generateSuggestions } from './suggestion.service.js';
import { getTrustLevel } from '../../utils/trustLevels.js';

export function runFullAnalysis(formData) {
  const { descriptionQuality, breakdown: descBreakdown } = scoreDescription(formData);
  const { completenessScore, missingFields, presentFields, completenessLevel } = checkCompleteness(formData);
  const { suspiciousScore, riskLevel: suspiciousRiskLevel, suspiciousTerms, allPatterns } = detectSuspicious(formData.description);
  const { matches: duplicateMatches, highestSimilarity, duplicateRisk } = detectDuplicates(formData.productName);
  const suggestions = generateSuggestions(formData, { descriptionQuality, completenessScore, duplicateRisk, suspiciousScore });

  const trustScore = Math.round(
    completenessScore * 0.40
    + descriptionQuality * 0.30
    + (100 - duplicateRisk) * 0.20
    + (100 - suspiciousScore) * 0.10,
  );

  const { level: trustLevel, color: trustColor, bg: trustBg } = getTrustLevel(trustScore);

  const radarData = [
    { subject: 'Completeness', A: completenessScore, fullMark: 100 },
    { subject: 'Description', A: descriptionQuality, fullMark: 100 },
    { subject: 'Images', A: (formData.images?.length || 0) >= 3 ? 90 : (formData.images?.length || 0) * 30, fullMark: 100 },
    { subject: 'Safety', A: 100 - suspiciousScore, fullMark: 100 },
    { subject: 'Trust', A: trustScore, fullMark: 100 },
    { subject: 'Uniqueness', A: 100 - duplicateRisk, fullMark: 100 },
  ];

  return {
    trustScore,
    trustLevel,
    trustColor,
    trustBg,
    completeness: completenessScore,
    completenessLevel,
    descriptionQuality,
    descBreakdown,
    duplicateRisk,
    highestSimilarity,
    suspiciousRisk: suspiciousScore,
    suspiciousRiskLevel,
    missingFields,
    presentFields,
    suspiciousTerms,
    allPatterns,
    duplicateMatches,
    suggestions,
    radarData,
    analysedAt: new Date().toISOString(),
    listingName: formData.productName || 'Untitled',
  };
}
