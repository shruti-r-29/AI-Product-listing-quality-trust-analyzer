import { Router } from 'express';
import { asyncHandler, authenticate } from '../middleware/auth.middleware.js';
import * as trustCenterController from '../controllers/trustCenter.controller.js';

const router = Router();

router.use(authenticate);

router.get('/stats', asyncHandler(trustCenterController.getStats));

export default router;
