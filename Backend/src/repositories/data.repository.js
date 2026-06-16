const users = new Map();
const listings = new Map();
const analyses = new Map();

function getUserStore(userId) {
  if (!listings.has(userId)) listings.set(userId, []);
  if (!analyses.has(userId)) analyses.set(userId, []);
  return {
    listings: listings.get(userId),
    analyses: analyses.get(userId),
  };
}

export async function findUserByEmail(email) {
  return users.get(email.toLowerCase()) || null;
}

export async function createUser({ name, email, password }) {
  const key = email.toLowerCase();
  const user = {
    name,
    email: key,
    password,
    plan: 'Pro',
    createdAt: new Date().toISOString(),
  };
  users.set(key, user);
  getUserStore(key);
  return user;
}

export async function findOrCreateUser(email, data = {}) {
  const existing = await findUserByEmail(email);
  if (existing) return existing;
  return createUser({ name: data.name, email, password: data.password || '' });
}

export async function saveListing(userId, listing) {
  const store = getUserStore(userId);
  const id = listing.id || `lst_${Date.now()}`;
  const existing = store.listings.findIndex((l) => l.id === id);
  const record = { ...listing, id, savedAt: new Date().toISOString() };
  if (existing >= 0) store.listings[existing] = record;
  else store.listings.unshift(record);
  return record;
}

export async function getListings(userId) {
  return getUserStore(userId).listings;
}

export async function getListingById(userId, id) {
  return getUserStore(userId).listings.find((l) => l.id === id) || null;
}

export async function deleteListing(userId, id) {
  const store = getUserStore(userId);
  const idx = store.listings.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  store.listings.splice(idx, 1);
  return true;
}

export async function saveAnalysis(userId, formData, result) {
  const store = getUserStore(userId);
  const id = `ana_${Date.now()}`;
  const record = {
    id,
    listingName: result.listingName || formData.productName || 'Untitled',
    category: formData.category || '',
    brand: formData.brand || '',
    trustScore: result.trustScore,
    trustLevel: result.trustLevel,
    descriptionQuality: result.descriptionQuality,
    completeness: result.completeness,
    duplicateRisk: result.duplicateRisk,
    suspiciousRisk: result.suspiciousRisk,
    status: result.trustScore >= 90 ? 'verified'
      : result.trustScore >= 70 ? 'warning'
        : 'flagged',
    formData,
    result,
    date: new Date().toISOString(),
  };
  store.analyses.unshift(record);
  store.analyses.splice(50);
  return record;
}

export async function getAnalysisHistory(userId) {
  return getUserStore(userId).analyses;
}

export async function deleteAnalysis(userId, id) {
  const store = getUserStore(userId);
  const idx = store.analyses.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  store.analyses.splice(idx, 1);
  return true;
}

export async function clearAnalysisHistory(userId) {
  analyses.set(userId, []);
  return true;
}
