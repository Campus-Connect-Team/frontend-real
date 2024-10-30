import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  return (
    <SearchContext.Provider value={{ filteredPosts, setFilteredPosts }}>
      {children}
    </SearchContext.Provider>
  );
};
