import { Router } from 'express';
import { asyncHandler, authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';
import { signupSchema, loginSchema } from '../validators/auth.validator.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', authLimiter, validate(signupSchema), asyncHandler(authController.signup));
router.post('/login', authLimiter, validate(loginSchema), asyncHandler(authController.login));
router.post('/logout', authenticate, asyncHandler(authController.logout));

export default router;
