'use client';

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState();

  const filterByTag = (tagName) => {
    const newSelectedTags = [...selectedTags, tagName];
    setSelectedTags(newSelectedTags);
  };

  const unselectTag = (tagName) => {
    const newSelectedTags = selectedTags.filter(tag => tag !== tagName);
    setSelectedTags(newSelectedTags);
  };

  const removeFilter = () => {
    setSelectedTags([]);
  };

  const isSelected = (tagName) => {
    return selectedTags.includes(tagName);
  };

  const handleOnClickTag = (tagName) => {
    if (isSelected(tagName)) {
      unselectTag(tagName);
    } else {
      filterByTag(tagName);
    }
  };

  const handleFilteringByFolder = (folderId) => {
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    } else {
      setSelectedFolderId(folderId);
    }
  };

  return (
    <SearchContext.Provider value={{ selectedTags, setSelectedTags, selectedFolderId, handleOnClickTag, handleFilteringByFolder }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);