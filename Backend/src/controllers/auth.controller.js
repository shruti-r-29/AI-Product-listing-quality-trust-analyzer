import * as authService from '../services/auth.service.js';

export async function signup(req, res) {
  const result = await authService.signup(req.body);
  res.status(201).json({ success: true, ...result });
}

export async function login(req, res) {
  const result = await authService.login(req.body);
  res.json({ success: true, ...result });
}

export async function logout(req, res) {
  const result = await authService.logout();
  res.json({ success: true, ...result });
}
