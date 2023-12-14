import { useBookmark } from "./useBookmark";
import { useFolder } from "./useFolder";

export function useDnD() {
  const { putBookmarkInFolder } = useBookmark();
  const { updateParentFolder, sortFolder, prependToParentFolder } = useFolder();

  /**
   * ドラッグ要素とドロップ要素の識別するidはすべて文字列で「id:type」の形式とする
   * itemData関数に渡して数値のidと文字列のtypeに分解して、条件分岐と処理に使う
   */
  const itemData = (id) => {
    if (id === 'all') return { id: null, type: 'store' };
    const identifiers = id.split(':');
    return {
      id: parseInt(identifiers[0]),
      type: identifiers[1],
    };
  };

  const handleDragStart = (e, setActiveId) => {
    const item = itemData(e.active.id);
    if (item.type === 'folder' || 'bookmark') setActiveId(item.id);
  };

  const handleDragEnd = (e, setActiveId) => {
    const { active, over } = e;
    setActiveId(null);

    const isDropped = over;
    if (isDropped) {
      const targetItem = itemData(active.id);
      const parentFolder = itemData(over.id);

      const isSelf = targetItem.id === parentFolder.id;
      
      if (targetItem.type === 'bookmark') {
        if (parentFolder.type === 'store') putBookmarkInFolder(targetItem.id, parentFolder.id);
      } else {
        if (isSelf) return;
        switch (parentFolder.type) {
          case 'store':
            updateParentFolder(targetItem.id, parentFolder.id);
            break;
          case 'sort':
            sortFolder(targetItem.id, parentFolder.id);
            break;
          case 'top':
            prependToParentFolder(targetItem.id, parentFolder.id);
            break;
          default:
            console.log('No matching case found.');
            break;
        }
      }
    }
  };

  return {
    itemData,
    handleDragStart,
    handleDragEnd,
  };
}