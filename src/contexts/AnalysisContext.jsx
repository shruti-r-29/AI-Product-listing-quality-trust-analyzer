import { createContext, useContext, useState } from 'react';
import { runFullAnalysis } from '../utils/trustEngine.js';
import { saveAnalysis } from '../services/storageService.js';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  /**
   * Run full deterministic analysis on formData,
   * save to localStorage, and store in state.
   */
  const runAnalysis = (formData) => {
    setIsAnalysing(true);
    const result = runFullAnalysis(formData);
    saveAnalysis(formData, result);
    setAnalysisResult(result);
    setIsAnalysing(false);
    return result;
  };

  const clearResult = () => setAnalysisResult(null);

  return (
    <AnalysisContext.Provider value={{
      analysisResult, setAnalysisResult,
      isAnalysing, runAnalysis, clearResult,
    }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  return useContext(AnalysisContext);
}
