const SUSPICIOUS_PATTERNS = [
  { phrase: '100% guaranteed', severity: 'medium' },
  { phrase: 'send money directly', severity: 'high' },
  { phrase: 'contact outside platform', severity: 'high' },
  { phrase: 'instant profit', severity: 'high' },
  { phrase: 'wire transfer', severity: 'high' },
  { phrase: 'pay outside', severity: 'high' },
  { phrase: 'whatsapp only', severity: 'high' },
  { phrase: 'telegram only', severity: 'high' },
  { phrase: 'investment opportunity', severity: 'high' },
  { phrase: 'limited time offer', severity: 'low' },
  { phrase: 'act now', severity: 'low' },
  { phrase: 'guaranteed returns', severity: 'high' },
  { phrase: 'no questions asked', severity: 'medium' },
  { phrase: 'cash only', severity: 'medium' },
  { phrase: 'western union', severity: 'high' },
  { phrase: 'money order', severity: 'medium' },
  { phrase: 'contact me directly', severity: 'medium' },
  { phrase: 'dm me', severity: 'low' },
];

const SEVERITY_SCORE = { high: 30, medium: 15, low: 5 };

export function detectSuspicious(description) {
  const text = (description || '').toLowerCase();

  const allPatterns = SUSPICIOUS_PATTERNS.map((p) => {
    const found = text.includes(p.phrase.toLowerCase());
    return { ...p, found };
  });

  const suspiciousTerms = allPatterns.filter((p) => p.found);

  const raw = suspiciousTerms.reduce((acc, p) => acc + (SEVERITY_SCORE[p.severity] || 5), 0);
  const suspiciousScore = Math.min(raw, 100);

  let riskLevel;
  if (suspiciousScore === 0) riskLevel = 'none';
  else if (suspiciousScore <= 15) riskLevel = 'low';
  else if (suspiciousScore <= 40) riskLevel = 'medium';
  else riskLevel = 'high';

  return { suspiciousScore, riskLevel, suspiciousTerms, allPatterns };
}
