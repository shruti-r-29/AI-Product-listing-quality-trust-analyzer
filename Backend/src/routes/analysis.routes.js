import { Router } from 'express';
import { asyncHandler, authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { analysisRunSchema } from '../validators/listing.validator.js';
import * as analysisController from '../controllers/analysis.controller.js';

const router = Router();

router.use(authenticate);

router.post('/run', validate(analysisRunSchema), asyncHandler(analysisController.runAnalysis));
router.get('/history', asyncHandler(analysisController.getHistory));
router.delete('/history', asyncHandler(analysisController.clearHistory));
router.delete('/:id', asyncHandler(analysisController.deleteAnalysis));

export default router;
