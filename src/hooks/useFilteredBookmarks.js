import { useMemo } from "react";

import { useFetchBookmarks } from "../hooks/useFetchBookmarks";
import { useSearchContext } from "../context/SearchContext";

export function useFilteredBookmarks() {
  const { bookmarks, error } = useFetchBookmarks();
  const { selectedTags, setSelectedTags, selectedFolderId, searchKeyword } = useSearchContext();

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
  
    let finalResult = bookmarks;
  
    // フォルダで絞り込む
    if (selectedFolderId) {
      finalResult = bookmarks.filter((bookmark) => bookmark.folder_id === selectedFolderId);
    }
  
    // タグで絞り込む
    if (selectedTags.length > 0) {
      const tagFilteredResult = finalResult.filter((bookmark) =>
        selectedTags.every((selectedTag) =>
          bookmark.tags.some((tag) => tag.name === selectedTag)
        )
      );

      // タグで絞り込んだ結果が0件になった場合、リロードする以外にタグの選択を解除できなくなるので、その場合はタグの選択を解除する
      if (tagFilteredResult.length > 0) {
        finalResult = tagFilteredResult;
      } else {
        setSelectedTags([]);
      }
    }

    // 検索キーワードで絞り込む
    if (searchKeyword) {
      finalResult = finalResult.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return finalResult;
  }, [bookmarks, selectedTags, selectedFolderId, searchKeyword]);

  return {
    bookmarks: filteredBookmarks,
    isLoading: !error && !bookmarks,
    isError: error
  };
}