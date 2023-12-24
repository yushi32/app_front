import { useDroppable, useDndContext } from "@dnd-kit/core";

import { useDragAndDrop } from "../hooks/useDragAndDrop";

export default function FolderSortingArea({ id, topSort = false, setIsHovered, handleClick, bgStyle , borderStyle }) {
  const { isOver, setNodeRef } = useDroppable({ id: topSort ? `${id}:top` : `${id}:sort` });
  const { active } = useDndContext();
  const { itemData } = useDragAndDrop();

  const dragItemType = active && itemData(active.id).type;
  const isFolder = dragItemType === 'folder';

  if (topSort) {
    return (
      <div className="pl-4 pt-2">
        <div
          ref={setNodeRef}
          className={`
            w-full
            h-2
            ${isOver && 'border-b-4 border-blue-400'}
          `}
        >
        </div>
      </div>
    );
  }

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      ref={setNodeRef}
      className={`
        w-full
        h-2.5
        ${bgStyle}
        ${!isOver && borderStyle}
        ${isOver && isFolder && 'border-b-4 border-blue-400'}
      `}
    >
    </button>
  );
}