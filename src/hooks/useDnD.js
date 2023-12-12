import { useBookmark } from "./useBookmark";
import { useFolder } from "./useFolder";

export function useDnD() {
  const { putBookmarkInFolder } = useBookmark();
  const { updateParentFolder } = useFolder();

  const extractNumericId = (id) => {
    const identifiers = id.split(':');
    return parseInt(identifiers[0]);
  };

  const handleDragStart = (e, setActiveId) => {
    const id = extractNumericId(e.active.id);
    setActiveId(id);
  };

  const handleDragEnd = (e, setActiveId) => {
    setActiveId(null);
    const isDropped = e.over;
    const isFolder = isNaN(e.active.id);

    if (isDropped) {
      // draggedItemIdはブックマークとフォルダのどちらも入る
      const draggedItemId = e.active.id;
      const parentFolderId = e.over.id === 'all' ? null : e.over.id;

      if (isFolder) {
        // フォルダをドラッグした時の処理

        // ドラッグ&ドロップを識別するためのidからフォルダのidを取り出す処理
        const identifiers = draggedItemId.split(':');
        const childFolderId = parseInt(identifiers[0]);

        if (childFolderId !== parentFolderId) updateParentFolder(childFolderId, parentFolderId);
      } else {
        // ブックマークをドラッグした時の処理
        putBookmarkInFolder(draggedItemId, parentFolderId);
      }
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
  };
}