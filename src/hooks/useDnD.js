import { useBookmark } from "./useBookmark";
import { useFolder } from "./useFolder";

export function useDnD() {
  const { putBookmarkInFolder } = useBookmark();
  const { updateParentFolder, sortFolder } = useFolder();

  /**
   * ドラッグ要素とドロップ要素の識別するidはすべて文字列で「id:type」の形式とする
   * itemData関数に渡して数値のidと文字列のtypeに分解して、条件分岐と処理に使う
   */
  const itemData = (id) => {
    if (id === 'all') return { id };
    const identifiers = id.split(':');
    return {
      id: parseInt(identifiers[0]),
      type: identifiers[1],
    };
  };

  const handleDragStart = (e, setActiveId) => {
    const item = itemData(e.active.id);
    if (item.type === 'folder') setActiveId(item.id);
  };

  const handleDragEnd = (e, setActiveId) => {
    const { active, over } = e;
    setActiveId(null);
    console.log(e)

    const isDropped = over;

    if (isDropped) {
      const targetItem = itemData(active.id);
      
      if (targetItem.type === 'bookmark') {
        console.log(`${targetItem.id}: ${targetItem.type}`);
      } else {
        console.log(`${targetItem.id}: ${targetItem.type}`);
      }
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
  };
}