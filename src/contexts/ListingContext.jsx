import { createContext, useContext, useState } from 'react';
import { saveListing, getListings, deleteListing } from '../services/storageService.js';

const ListingContext = createContext(null);

export function ListingProvider({ children }) {
  const [currentListing, setCurrentListing] = useState(null);
  const [listings, setListings] = useState(() => getListings());

  const addListing = (listing) => {
    const saved = saveListing(listing);
    setListings(getListings());
    return saved;
  };

  const removeListing = (id) => {
    deleteListing(id);
    setListings(getListings());
  };

  const refreshListings = () => setListings(getListings());

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
