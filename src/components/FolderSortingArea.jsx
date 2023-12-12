import { useDroppable } from "@dnd-kit/core";

export default function FolderSortingArea({ id, setIsHovered, handleClickFolder, bgStyle, borderStyle }) {
  const { setNodeRef } = useDroppable({ id: `${id}`});
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClickFolder}
      ref={setNodeRef}
      className={`w-full h-2.5 ${bgStyle()} ${borderStyle()}`}
    >
    </button>
  );
}