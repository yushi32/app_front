import { useState, useEffect } from "react";

import { useFetchData } from "../hooks/useFetchData";
import { useSearchContext } from "../context/SearchContext";

export function useFilteredBookmarks() {
  const { bookmarks } = useFetchData();
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { selectedTags, setSelectedTags } = useSearchContext();

  useEffect(() => {
    if (bookmarks) {
      setFilteredBookmarks(bookmarks);
      setSelectedTags([]);
      setDataLoading(true);
    }
  }, [bookmarks]);

  useEffect(() => {
    if (!selectedTags.length) {
      setFilteredBookmarks(bookmarks);
    } else {
      const result = bookmarks.filter((bookmark) =>
        selectedTags.every((selectedTag) =>
          bookmark.tags.some((tag) => tag.name === selectedTag)
        )
      );
      setFilteredBookmarks(result);
    }
  }, [selectedTags]);

  return {
    filteredBookmarks,
    dataLoading
  };
}