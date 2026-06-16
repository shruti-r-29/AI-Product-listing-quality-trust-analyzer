export function getTrustLevel(score) {
  if (score >= 90) return { level: 'Trusted', color: '#22C55E', bg: '#22C55E18' };
  if (score >= 70) return { level: 'Good', color: '#06B6D4', bg: '#06B6D418' };
  if (score >= 50) return { level: 'Needs Review', color: '#F59E0B', bg: '#F59E0B18' };
  return { level: 'High Risk', color: '#EF4444', bg: '#EF444418' };
}

export function deriveStatus(trustScore) {
  if (trustScore >= 90) return 'verified';
  if (trustScore >= 70) return 'warning';
  return 'flagged';
}

export function deriveNameFromEmail(email) {
  const rawName = email.split('@')[0];
  return rawName
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
