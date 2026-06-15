import { Router } from 'express';
import { asyncHandler, authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { listingSchema } from '../validators/listing.validator.js';
import * as listingsController from '../controllers/listings.controller.js';

const router = Router();

router.use(authenticate);

router.post('/', validate(listingSchema), asyncHandler(listingsController.createListing));
router.get('/', asyncHandler(listingsController.getListings));
router.get('/:id', asyncHandler(listingsController.getListing));
router.delete('/:id', asyncHandler(listingsController.deleteListing));

export default router;
