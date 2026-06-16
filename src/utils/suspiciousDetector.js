/**
 * suspiciousDetector.js — FIX #5
 * Scans actual user description text for fraud/risk phrases.
 */

const SUSPICIOUS_PATTERNS = [
  { phrase: '100% guaranteed',           severity: 'medium' },
  { phrase: 'send money directly',        severity: 'high'   },
  { phrase: 'contact outside platform',   severity: 'high'   },
  { phrase: 'instant profit',             severity: 'high'   },
  { phrase: 'wire transfer',              severity: 'high'   },
  { phrase: 'pay outside',               severity: 'high'   },
  { phrase: 'whatsapp only',              severity: 'high'   },
  { phrase: 'telegram only',              severity: 'high'   },
  { phrase: 'investment opportunity',     severity: 'high'   },
  { phrase: 'limited time offer',         severity: 'low'    },
  { phrase: 'act now',                    severity: 'low'    },
  { phrase: 'guaranteed returns',         severity: 'high'   },
  { phrase: 'no questions asked',         severity: 'medium' },
  { phrase: 'cash only',                  severity: 'medium' },
  { phrase: 'western union',              severity: 'high'   },
  { phrase: 'money order',               severity: 'medium' },
  { phrase: 'contact me directly',        severity: 'medium' },
  { phrase: 'dm me',                      severity: 'low'    },
];

const SEVERITY_SCORE = { high: 30, medium: 15, low: 5 };

/**
 * @param {string} description - raw text from user
 * @returns {{ suspiciousScore, riskLevel, suspiciousTerms, allPatterns }}
 */
export function detectSuspiciousContent(description) {
  const text = (description || '').toLowerCase();

  const allPatterns = SUSPICIOUS_PATTERNS.map(p => {
    const found = text.includes(p.phrase.toLowerCase());
    return { ...p, found };
  });

  const suspiciousTerms = allPatterns.filter(p => p.found);

  // Score capped at 100
  const raw = suspiciousTerms.reduce((acc, p) => acc + (SEVERITY_SCORE[p.severity] || 5), 0);
  const suspiciousScore = Math.min(raw, 100);

  let riskLevel;
  if (suspiciousScore === 0)      riskLevel = 'none';
  else if (suspiciousScore <= 15) riskLevel = 'low';
  else if (suspiciousScore <= 40) riskLevel = 'medium';
  else                            riskLevel = 'high';

  return { suspiciousScore, riskLevel, suspiciousTerms, allPatterns };
}

/**
 * Highlight suspicious phrases inside a description string.
 * Returns an array of { text, highlight } segments.
 */
export function highlightSuspiciousTerms(description, suspiciousTerms) {
  if (!description || suspiciousTerms.length === 0) {
    return [{ text: description, highlight: false }];
  }

  let segments = [{ text: description, highlight: false }];

  for (const term of suspiciousTerms) {
    const newSegments = [];
    for (const seg of segments) {
      if (seg.highlight) { newSegments.push(seg); continue; }
      const idx = seg.text.toLowerCase().indexOf(term.phrase.toLowerCase());
      if (idx === -1) { newSegments.push(seg); continue; }
      if (idx > 0) newSegments.push({ text: seg.text.slice(0, idx), highlight: false });
      newSegments.push({ text: seg.text.slice(idx, idx + term.phrase.length), highlight: true, severity: term.severity });
      if (idx + term.phrase.length < seg.text.length) {
        newSegments.push({ text: seg.text.slice(idx + term.phrase.length), highlight: false });
      }
    }
    segments = newSegments;
  }

  return segments;
}
