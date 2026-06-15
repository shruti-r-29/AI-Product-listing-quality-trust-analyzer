import { createContext, useContext, useState } from 'react';
import * as api from '../services/api.js';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const runAnalysis = async (formData) => {
    setIsAnalysing(true);
    try {
      const result = await api.runAnalysis(formData);
      setAnalysisResult(result);
      return result;
    } finally {
      setIsAnalysing(false);
    }
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
