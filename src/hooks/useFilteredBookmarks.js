import { useMemo } from "react";

import { useFetchData } from "../hooks/useFetchData";
import { useSearchContext } from "../context/SearchContext";

export function useFilteredBookmarks() {
  const { bookmarks, error } = useFetchData();
  const { selectedTags, selectedFolderId } = useSearchContext();

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];

    let result = bookmarks;
    
    if (selectedFolderId) {
      result = result.filter((bookmark) => bookmark.folder_id === selectedFolderId);
    }

    if (selectedTags.length > 0) {
      result = result.filter((bookmark) =>
        selectedTags.every((selectedTag) =>
          bookmark.tags.some((tag) => tag.name === selectedTag)
        )
      );
    }

    return result;
  }, [bookmarks, selectedTags, selectedFolderId]);

  return {
    bookmarks: filteredBookmarks,
    isLoading: !error && !bookmarks,
    isError: error
  };
}