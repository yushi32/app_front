import { useDroppable } from "@dnd-kit/core";

export default function FolderSortingArea({ id, setIsHovered, handleClick, bgStyle , borderStyle }) {
  const { isOver, setNodeRef } = useDroppable({ id: `${id}`});

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