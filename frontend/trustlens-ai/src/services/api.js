const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return sessionStorage.getItem('tl_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────

export async function signup({ name, email, password }) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch {
    // Clear local session even if server call fails
  }
}

// ── Listings ──────────────────────────────────────────────────────────────

export async function createListing(listing) {
  const res = await request('/listings', {
    method: 'POST',
    body: JSON.stringify(listing),
  });
  return res.data;
}

export async function getListings() {
  const res = await request('/listings');
  return res.data;
}

export async function getListing(id) {
  const res = await request(`/listings/${id}`);
  return res.data;
}

export async function deleteListing(id) {
  return request(`/listings/${id}`, { method: 'DELETE' });
}

// ── Analysis ──────────────────────────────────────────────────────────────

export async function runAnalysis(formData) {
  return request('/analysis/run', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export async function getAnalysisHistory() {
  const res = await request('/analysis/history');
  return res.data;
}

export async function deleteAnalysis(id) {
  return request(`/analysis/${id}`, { method: 'DELETE' });
}

export async function clearAnalysisHistory() {
  return request('/analysis/history', { method: 'DELETE' });
}

// ── Trust Center ────────────────────────────────────────────────────────────

export async function getTrustCenterStats() {
  const res = await request('/trust-center/stats');
  return res.data;
}
