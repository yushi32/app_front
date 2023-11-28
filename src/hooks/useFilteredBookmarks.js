import { useMemo } from "react";

import { useFetchData } from "../hooks/useFetchData";
import { useSearchContext } from "../context/SearchContext";

export function useFilteredBookmarks() {
  const { bookmarks, error } = useFetchData();
  const { selectedTags } = useSearchContext();

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
    if (selectedTags.length === 0) return bookmarks;
    return bookmarks.filter((bookmark) =>
      selectedTags.every((selectedTag) =>
        bookmark.tags.some((tag) => tag.name === selectedTag)
      )
    );
  }, [bookmarks, selectedTags]);

  return {
    bookmarks: filteredBookmarks,
    isLoading: !error && !bookmarks,
    isError: error
  };
}