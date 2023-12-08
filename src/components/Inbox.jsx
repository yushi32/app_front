import { useDroppable } from '@dnd-kit/core';

import { useSearchContext } from "../context/SearchContext";

export default function Folder() {
  const { selectedFolderId, handleFilteringByFolder } = useSearchContext();
  const { isOver, setNodeRef } = useDroppable({
    id: 'all',
  });

  const handleOnClick = () => {
    handleFilteringByFolder(null);
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        flex
        items-center
        justify-center
        justify-between
        border-l-2
        ${!selectedFolderId ? 'border-emerald-200' : 'border-transparent'}
        hover:border-emerald-200
        ${isOver ? 'bg-emerald-200' : ''}
      `}
    >
      <button
        onClick={handleOnClick}
        className="text-left text-sm font-medium w-full h-full py-2.5 pl-2"
      >
        All
      </button>
    </div>
  );
}