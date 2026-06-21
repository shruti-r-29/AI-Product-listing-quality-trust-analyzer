import { createContext, useContext, useState, useCallback } from 'react';
import { getAnalysisHistory, clearHistory, deleteAnalysis } from '../services/storageService.js';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => getAnalysisHistory());

  const refresh = useCallback(() => {
    setHistory(getAnalysisHistory());
  }, []);

  const remove = (id) => {
    deleteAnalysis(id);
    refresh();
  };

  const clear = () => {
    clearHistory();
    refresh();
  };

  return (
    <HistoryContext.Provider value={{ history, refresh, remove, clear }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
