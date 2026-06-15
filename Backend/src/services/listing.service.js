import * as repo from '../repositories/data.repository.js';
import { ApiError } from '../utils/apiError.js';

export async function createListing(userId, listing) {
  return repo.saveListing(userId, listing);
}

export async function getAllListings(userId) {
  return repo.getListings(userId);
}

export async function getListing(userId, id) {
  const listing = await repo.getListingById(userId, id);
  if (!listing) throw new ApiError(404, 'Listing not found');
  return listing;
}

export async function removeListing(userId, id) {
  const deleted = await repo.deleteListing(userId, id);
  if (!deleted) throw new ApiError(404, 'Listing not found');
  return true;
}
