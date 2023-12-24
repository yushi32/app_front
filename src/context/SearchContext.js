'use client';

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const selectTag = (tagName) => {
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

  const isSelectedTag = (tagName) => {
    return selectedTags.includes(tagName);
  };

  const handleFilteringByTag = (tagName) => {
    if (isSelectedTag(tagName)) {
      unselectTag(tagName);
    } else {
      selectTag(tagName);
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
    <SearchContext.Provider value={{
      selectedTags,
      setSelectedTags,
      selectedFolderId,
      setSelectedFolderId,
      handleFilteringByTag,
      handleFilteringByFolder
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);