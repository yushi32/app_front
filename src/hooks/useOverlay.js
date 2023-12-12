import { useState } from "react";

import { useFetchFolders } from "./useFetchFolders";

export function useOverlay() {
  const { folders } = useFetchFolders();
  const [activeId, setActiveId] = useState(null);

  const activeFolder = folders?.find((folder) => folder.id === activeId);

  return {
    setActiveId,
    activeFolder,
  };
}