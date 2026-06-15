/**
 * AppContext — now a thin shell that:
 *  1. Manages user auth (login/logout)
 *  2. Composes ListingContext, AnalysisContext, HistoryContext
 *  3. Re-exports useApp() for backward compat with existing pages
 */
import { createContext, useContext, useState } from 'react';
import * as api from '../services/api.js';
import { ListingProvider, useListing } from '../contexts/ListingContext.jsx';
import { AnalysisProvider, useAnalysis } from '../contexts/AnalysisContext.jsx';
import { HistoryProvider, useHistory } from '../contexts/HistoryContext.jsx';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = sessionStorage.getItem('tl_user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const setSession = (token, userData) => {
    const u = { ...userData, plan: userData.plan || 'Pro' };
    setUser(u);
    sessionStorage.setItem('tl_user', JSON.stringify(u));
    sessionStorage.setItem('tl_token', token);
  };

  const login = (userData) => {
    const u = { ...userData, plan: 'Pro' };
    setUser(u);
    sessionStorage.setItem('tl_user', JSON.stringify(u));
  };

  const loginAccount = async ({ email, password }) => {
    const res = await api.login({ email, password });
    setSession(res.token, res.user);
    return res.user;
  };

  const signupAccount = async ({ name, email, password }) => {
    const res = await api.signup({ name, email, password });
    setSession(res.token, res.user);
    return res.user;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    sessionStorage.removeItem('tl_user');
    sessionStorage.removeItem('tl_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAccount, signupAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Root provider — wraps everything */
export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ListingProvider>
        <AnalysisProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </AnalysisProvider>
      </ListingProvider>
    </AuthProvider>
  );
}

/**
 * useApp() — backward-compat hook used by existing pages.
 * Merges auth + listing + analysis into one object.
 */
export function useApp() {
  const auth     = useContext(AuthContext);
  const listing  = useListing();
  const analysis = useAnalysis();
  const hist     = useHistory();

  return {
    // auth
    user:    auth?.user,
    login:   auth?.login,
    loginAccount: auth?.loginAccount,
    signupAccount: auth?.signupAccount,
    logout:  auth?.logout,
    // listing
    currentListing:    listing?.currentListing,
    setCurrentListing: listing?.setCurrentListing,
    // analysis
    analysisResult:    analysis?.analysisResult,
    setAnalysisResult: analysis?.setAnalysisResult,
    runAnalysis:       analysis?.runAnalysis,
    // history
    history:   hist?.history,
    refreshHistory: hist?.refresh,
  };
}
