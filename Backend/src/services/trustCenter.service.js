import * as repo from '../repositories/data.repository.js';
import {
  MOCK_LISTINGS,
  MOCK_RISK_DISTRIBUTION,
  MOCK_TRUST_TREND,
} from '../data/marketplace.db.js';

export async function getStats(userId) {
  const history = await repo.getAnalysisHistory(userId);

  if (history.length === 0) {
    return {
      avgTrust: 82,
      verified: MOCK_LISTINGS.filter((l) => l.status === 'verified').length,
      flagged: MOCK_LISTINGS.filter((l) => l.status === 'flagged').length,
      totalRun: 247,
      trustTrend: MOCK_TRUST_TREND,
      qualityTrend: MOCK_TRUST_TREND.map((d) => ({ month: d.month, quality: d.score - 5 })),
      dupTrend: MOCK_TRUST_TREND.map((d) => ({ month: d.month, dupRisk: 30 - d.listings })),
      riskDist: MOCK_RISK_DISTRIBUTION,
      displayListings: MOCK_LISTINGS,
    };
  }

  const avgTrust = Math.round(history.reduce((a, h) => a + h.trustScore, 0) / history.length);
  const verified = history.filter((h) => h.status === 'verified').length;
  const flagged = history.filter((h) => h.status === 'flagged').length;
  const totalRun = history.length;

  const trustTrend = history.length < 2
    ? MOCK_TRUST_TREND
    : history.slice(0, 6).reverse().map((h, i) => ({
      month: new Date(h.date).toLocaleString('en-US', { month: 'short' }),
      score: h.trustScore,
      listings: i + 1,
    }));

  const qualityTrend = history.length < 2
    ? MOCK_TRUST_TREND.map((d) => ({ month: d.month, quality: d.score - 5 }))
    : history.slice(0, 6).reverse().map((h) => ({
      month: new Date(h.date).toLocaleString('en-US', { month: 'short' }),
      quality: h.descriptionQuality,
    }));

  const dupTrend = history.length < 2
    ? MOCK_TRUST_TREND.map((d) => ({ month: d.month, dupRisk: 30 - d.listings }))
    : history.slice(0, 6).reverse().map((h) => ({
      month: new Date(h.date).toLocaleString('en-US', { month: 'short' }),
      dupRisk: h.duplicateRisk,
    }));

  const riskDist = history.length < 3
    ? MOCK_RISK_DISTRIBUTION
    : (() => {
      const trusted = history.filter((h) => h.trustScore >= 90).length;
      const good = history.filter((h) => h.trustScore >= 70 && h.trustScore < 90).length;
      const needsReview = history.filter((h) => h.trustScore >= 50 && h.trustScore < 70).length;
      const highRisk = history.filter((h) => h.trustScore < 50).length;
      const total = history.length;
      return [
        { name: 'Trusted', value: Math.round(trusted / total * 100), color: '#22C55E' },
        { name: 'Good', value: Math.round(good / total * 100), color: '#06B6D4' },
        { name: 'Needs Review', value: Math.round(needsReview / total * 100), color: '#F59E0B' },
        { name: 'High Risk', value: Math.round(highRisk / total * 100), color: '#EF4444' },
      ].filter((d) => d.value > 0);
    })();

  const displayListings = history.slice(0, 8).map((h) => ({
    id: h.id,
    title: h.listingName,
    brand: h.brand,
    category: h.category,
    trustScore: h.trustScore,
    descriptionQuality: h.descriptionQuality,
    duplicateRisk: h.duplicateRisk,
    suspiciousRisk: h.suspiciousRisk,
    status: h.status,
  }));

  return {
    avgTrust,
    verified,
    flagged,
    totalRun,
    trustTrend,
    qualityTrend,
    dupTrend,
    riskDist,
    displayListings,
  };
}
