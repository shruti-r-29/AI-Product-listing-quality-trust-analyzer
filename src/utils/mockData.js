/**
 * mockData.js — backward-compat re-export barrel.
 * All data now lives in src/data/. Import from there directly in new code.
 */
export * from '../data/listings.js';
export * from '../data/analytics.js';
export * from '../data/duplicates.js';
export * from '../data/suggestions.js';

// Legacy stubs still used by Results page until it's updated
export const mockSuggestions = [];
export const mockSuspiciousPatterns = [];
export const mockMissingFields = [];
