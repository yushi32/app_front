'use client';

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const filterByTag = (tagName) => {
    const newSelectedTags = selectedTags.filter(tag => tag !== tagName);
    setSelectedTags(newSelectedTags);
  };

  const unselectTag = (tagName) => {
    const newSelectedTags = [...selectedTags, tagName];
    setSelectedTags(newSelectedTags);
  };

  const removeFilter = () => {
    setSelectedTags([]);
  };

  const isSelected = (tagName) => {
    return selectedTags.includes(tagName)
  };

  const handleOnClickTag = (tagName) => {
    if (isSelected(tagName)) {
      filterByTag(tagName)
    } else if (!isSelected(tagName)) {
      unselectTag(tagName);
    }
  };

  return (
    <SearchContext.Provider value={{ selectedTags, setSelectedTags, handleOnClickTag }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);