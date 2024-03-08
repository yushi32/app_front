'use client';

import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from '@dnd-kit/core';

import { useFilteredBookmarks } from "../../hooks/useFilteredBookmarks";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useOverlay } from "../../hooks/useOverlay";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useSearchContext } from "../../context/SearchContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";
import Sidebar from "../../components/Sidebar";
import OverlayContainer from "../../components/OverlayContainer";
import BookmarkModal from "../../components/BookmarkModal";

export default function Page() {
  useRequireAuth();
  const { bookmarks, isLoading } = useFilteredBookmarks();
  const { setSearchKeyword } = useSearchContext();
  const { handleDragStart, handleDragEnd } = useDragAndDrop();
  const { setActiveId, activeFolder, activeBookmark } = useOverlay();
  const [overlayColor, setOverlayColor] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSearchKeyword('')
  }, []);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <DndContext
      onDragStart={(e) => handleDragStart(e, setActiveId)}
      onDragEnd={(e) => handleDragEnd(e, setActiveId)}
    >
      <div className="flex-grow grid grid-cols-5 max-w-7xl w-full mx-auto mb-8 h-80">
        <Sidebar />
        <div className="col-span-4 overflow-y-auto grid grid-cols-3 gap-x-4 gap-y-4 max-w-5xl w-full mx-auto px-8 pt-12 pb-6">
          <BookmarkModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          {bookmarks.length === 0 ? (
            <NoContents />
          ) : bookmarks.map((bookmark) => {
            return (
              <Card
                key={bookmark.id}
                id={bookmark.id}
                url={bookmark.url}
                title={bookmark.title}
                thumbnail={bookmark.thumbnail}
                bookmarkTags={bookmark.tags}
                setOverlayColor={setOverlayColor}
                setIsModalOpen={setIsModalOpen}
              />
            );
          })}
        </div>
      </div>
      <DragOverlay>
        <OverlayContainer activeBookmark={activeBookmark} activeFolder={activeFolder} overlayColor={overlayColor} />
      </DragOverlay>
    </DndContext>
  );
}