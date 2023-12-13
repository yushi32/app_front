import { useDroppable } from "@dnd-kit/core";

export default function FolderSortingArea({ id, sortId, setIsHovered, handleClick, bgStyle , borderStyle }) {
  const { isOver, setNodeRef } = useDroppable({ id: `${sortId}` || `${id}` });

  if (sortId) {
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
        ${bgStyle()}
        ${!isOver && borderStyle()}
        ${isOver && 'border-b-4 border-blue-400'}
      `}
    >
    </button>
  );
}