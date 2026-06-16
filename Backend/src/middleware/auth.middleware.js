import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { ApiError } from '../utils/apiError.js';

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export function signToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export { ApiError };
