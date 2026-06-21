/**
 * storageService.js — FIX #3
 * All localStorage operations for listings, analyses and history.
 * Keys are prefixed with 'tl_' to avoid conflicts.
 */

const KEYS = {
  LISTINGS:  'tl_listings',
  ANALYSES:  'tl_analyses',
  HISTORY:   'tl_history',
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// ── Listings ────────────────────────────────────────────────────────────

export function saveListing(listing) {
  const all = read(KEYS.LISTINGS);
  const id = listing.id || `lst_${Date.now()}`;
  const existing = all.findIndex(l => l.id === id);
  const record = { ...listing, id, savedAt: new Date().toISOString() };
  if (existing >= 0) all[existing] = record;
  else all.unshift(record);
  write(KEYS.LISTINGS, all);
  return record;
}

export function getListings() {
  return read(KEYS.LISTINGS);
}

export function deleteListing(id) {
  const filtered = read(KEYS.LISTINGS).filter(l => l.id !== id);
  write(KEYS.LISTINGS, filtered);
}

// ── Analysis Results ────────────────────────────────────────────────────

export function saveAnalysis(formData, result) {
  const all = read(KEYS.ANALYSES);
  const id = `ana_${Date.now()}`;
  const record = {
    id,
    listingName:    result.listingName || formData.productName || 'Untitled',
    category:       formData.category  || '',
    brand:          formData.brand     || '',
    trustScore:     result.trustScore,
    trustLevel:     result.trustLevel,
    descriptionQuality: result.descriptionQuality,
    completeness:   result.completeness,
    duplicateRisk:  result.duplicateRisk,
    suspiciousRisk: result.suspiciousRisk,
    status:         result.trustScore >= 90 ? 'verified'
                  : result.trustScore >= 70 ? 'warning'
                  : 'flagged',
    formData,
    result,
    date: new Date().toISOString(),
  };
  all.unshift(record);
  // Keep only latest 50
  write(KEYS.ANALYSES, all.slice(0, 50));
  return record;
}

export function getAnalysisHistory() {
  return read(KEYS.ANALYSES);
}

export function deleteAnalysis(id) {
  const filtered = read(KEYS.ANALYSES).filter(a => a.id !== id);
  write(KEYS.ANALYSES, filtered);
}

// ── History (alias for analyses for the history context) ────────────────

export function saveHistory(entry) {
  return saveAnalysis(entry.formData || {}, entry.result || entry);
}

export function getHistory() {
  return getAnalysisHistory();
}

export function clearHistory() {
  write(KEYS.ANALYSES, []);
  write(KEYS.HISTORY,  []);
}

// ── Utility ─────────────────────────────────────────────────────────────

export function getStorageStats() {
  return {
    listings:  read(KEYS.LISTINGS).length,
    analyses:  read(KEYS.ANALYSES).length,
  };
}
