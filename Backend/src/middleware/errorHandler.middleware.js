import { ApiError } from '../utils/apiError.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
}
