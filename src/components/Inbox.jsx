import { useState } from "react";
import { useDroppable } from '@dnd-kit/core';

import { useSearchContext } from "../context/SearchContext";

import FolderSortingArea from "../components/FolderSortingArea";

export default function Folder() {
  const { selectedFolderId, handleFilteringByFolder } = useSearchContext();
  const { isOver, setNodeRef } = useDroppable({
    id: 'all',
  });
  const [isHovered, setIsHovered] = useState(null);

  const borderStyle = () => {
    return isHovered || selectedFolderId === null ? 'border-l-2 border-emerald-200' : 'border-transparent';
  };

  const bgStyle = () => {
    return isOver ? 'bg-emerald-200' : 'bg-transparent';
  };

  const handleOnClick = () => {
    handleFilteringByFolder(null);
  };

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={setNodeRef}
        className={`
          flex
          items-center
          justify-center
          justify-between
          w-full
          ${bgStyle()}
          ${!isOver && borderStyle()}
        `}
      >
        <button
          onClick={handleOnClick}
          className="text-left text-sm font-medium w-full h-full pt-2.5 pl-2"
        >
          All
        </button>
      </div>
      <FolderSortingArea
        id={0}
        setIsHovered={setIsHovered}
        handleClick={handleOnClick}
        bgStyle={bgStyle}
        borderStyle={borderStyle}
      />
    </div>
  );
}