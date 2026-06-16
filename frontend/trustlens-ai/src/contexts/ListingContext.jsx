import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api.js';

const ListingContext = createContext(null);

export function ListingProvider({ children }) {
  const [currentListing, setCurrentListing] = useState(null);
  const [listings, setListings] = useState([]);

  const refreshListings = useCallback(async () => {
    const token = sessionStorage.getItem('tl_token');
    if (!token) {
      setListings([]);
      return;
    }
    try {
      const data = await api.getListings();
      setListings(data);
    } catch {
      setListings([]);
    }
  }, []);

  useEffect(() => {
    refreshListings();
  }, [refreshListings]);

  const addListing = async (listing) => {
    const saved = await api.createListing(listing);
    await refreshListings();
    return saved;
  };

  const removeListing = async (id) => {
    await api.deleteListing(id);
    await refreshListings();
  };

  return (
    <ListingContext.Provider value={{
      currentListing, setCurrentListing,
      listings, addListing, removeListing, refreshListings,
    }}>
      {children}
    </ListingContext.Provider>
  );
}

export function useListing() {
  return useContext(ListingContext);
}
