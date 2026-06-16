import * as trustCenterService from '../services/trustCenter.service.js';

export async function getStats(req, res) {
  const stats = await trustCenterService.getStats(req.user.email);
  res.json({ success: true, data: stats });
}
