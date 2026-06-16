import * as listingService from '../services/listing.service.js';

export async function createListing(req, res) {
  const listing = await listingService.createListing(req.user.email, req.body);
  res.status(201).json({ success: true, data: listing });
}

export async function getListings(req, res) {
  const listings = await listingService.getAllListings(req.user.email);
  res.json({ success: true, data: listings });
}

export async function getListing(req, res) {
  const listing = await listingService.getListing(req.user.email, req.params.id);
  res.json({ success: true, data: listing });
}

export async function deleteListing(req, res) {
  await listingService.removeListing(req.user.email, req.params.id);
  res.json({ success: true, message: 'Listing deleted' });
}
