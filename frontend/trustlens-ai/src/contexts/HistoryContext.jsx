import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as api from '../services/api.js';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = sessionStorage.getItem('tl_token');
    if (!token) {
      setHistory([]);
      setLoading(false);
      return;
    }
    try {
      const data = await api.getAnalysisHistory();
      setHistory(data);
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = async (id) => {
    await api.deleteAnalysis(id);
    await refresh();
  };

  const clear = async () => {
    await api.clearAnalysisHistory();
    await refresh();
  };

  return (
    <HistoryContext.Provider value={{ history, loading, refresh, remove, clear }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
