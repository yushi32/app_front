import { useState } from "react";

import { useFetchBookmarks } from "./useFetchBookmarks";
import { useFetchFolders } from "./useFetchFolders";

export function useOverlay() {
  const { bookmarks } = useFetchBookmarks();
  const { folders } = useFetchFolders();
  const [activeId, setActiveId] = useState(null);

  const activeBookmark = bookmarks?.find((bookmark) => bookmark.id === activeId);
  const activeFolder = folders?.find((folder) => folder.id === activeId);

  return {
    setActiveId,
    activeFolder,
    activeBookmark,
  };
}