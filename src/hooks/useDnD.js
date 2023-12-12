import { useBookmark } from "./useBookmark";
import { useFolder } from "./useFolder";

export function useDnD() {
  const { putBookmarkInFolder } = useBookmark();
  const { updateParentFolder, sortFolder } = useFolder();

  // ドラッグした要素を一意に識別するためのidからフォルダのidを取り出す処理
  const extractNumericId = (id) => {
    const identifiers = id.split(':');
    return parseInt(identifiers[0]);
  };

  const handleDragStart = (e, setActiveId) => {
    // ブックマークをドラッグした時だけidが数値型になる
    if (isNaN(e.active.id)) {
      const id = extractNumericId(e.active.id);
      setActiveId(id);
    }
  };

  const handleDragEnd = (e, setActiveId) => {
    const { active, over } = e;
    setActiveId(null);

    const isDropped = over;

    if (isDropped) {
      // targetIdはブックマークとフォルダのどちらも入る
      const targetId = isNaN(active.id) ? extractNumericId(active.id) : active.id;
      const parentFolderId = over.id === 'all' ? null : over.id;

      /**
       * parentFolderIdは、フォルダの上にドロップした場合は数値型、ソート領域の上にドロップした場合は文字列の数値が入る
       * parentFolderIdがnullではなく、文字列の数値だった場合はisSortがtrueになる
       */
      const isSort = parentFolderId ? !Number.isInteger(parentFolderId) : parentFolderId;
      const targetIsFolder = isNaN(active.id);

      if (isSort) {
        const prevId = parseInt(parentFolderId);
        sortFolder(targetId, prevId);

      } else if (targetIsFolder) {
        // フォルダをドラッグした時の処理
        if (targetId !== parentFolderId) updateParentFolder(targetId, parentFolderId);
      } else {
        // ブックマークをドラッグした時の処理
        putBookmarkInFolder(targetId, parentFolderId);
      }
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
  };
}