'use client';

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [selectedTag, setSelectedTag] = useState();

  const filterByTag = (tagName) => {
    setSelectedTag(tagName);
  };

  const removeFilter = () => {
    setSelectedTag(null);
  };

  const handleOnClickTag = (tagName) => {
    if (selectedTag) {
      removeFilter();
    } else {
      filterByTag(tagName);
    }
  };

  return (
    <SearchContext.Provider value={{ selectedTag, setSelectedTag, handleOnClickTag }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);