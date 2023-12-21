import { useBookmark } from "./useBookmark";
import { useFolder } from "./useFolder";

export function useDragAndDrop() {
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
    const dragItem = itemData(e.active.id);
    setActiveId(dragItem.id);
  };

  const handleDragEnd = (e, setActiveId) => {
    setActiveId(null);

    const { active, over } = e;
    const isDropped = over;

    if (isDropped) {
      const dragItem = itemData(active.id);
      const droppedItem = itemData(over.id);

      const isSelf = dragItem.id === droppedItem.id;
      
      if (dragItem.type === 'bookmark') {
        if (droppedItem.type === 'store') putBookmarkInFolder(dragItem.id, droppedItem.id);
      } else {
        if (isSelf) return;
        switch (droppedItem.type) {
          case 'store':
            updateParentFolder(dragItem.id, droppedItem.id);
            break;
          case 'sort':
            sortFolder(dragItem.id, droppedItem.id);
            break;
          case 'top':
            prependToParentFolder(dragItem.id, droppedItem.id);
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