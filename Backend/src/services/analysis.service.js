import * as repo from '../repositories/data.repository.js';
import { runFullAnalysis } from './ai/trustEngine.service.js';
import { ApiError } from '../utils/apiError.js';

export async function runAnalysis(userId, formData) {
  const result = runFullAnalysis(formData);
  await repo.saveAnalysis(userId, formData, result);
  return result;
}

export async function getHistory(userId) {
  return repo.getAnalysisHistory(userId);
}

export async function removeAnalysis(userId, id) {
  const deleted = await repo.deleteAnalysis(userId, id);
  if (!deleted) throw new ApiError(404, 'Analysis not found');
  return true;
}

export async function clearHistory(userId) {
  await repo.clearAnalysisHistory(userId);
  return true;
}
