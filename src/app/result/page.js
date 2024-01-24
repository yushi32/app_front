'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

export default function Page() {
  useRequireAuth();
  const { bookmarks, isLoading } = useFilteredBookmarks();
  const { removeFilter, searchKeyword, setSearchKeyword } = useSearchContext();
  const { handleDragStart, handleDragEnd } = useDragAndDrop();
  const { setActiveId, activeFolder, activeBookmark } = useOverlay();
  const [overlayColor, setOverlayColor] = useState();
  const searchParams = useSearchParams();

  const message = () => {
    return (
      <div className="flex items-center pb-5 text-lg font-semibold">
        <span className="italic">{searchKeyword}</span>&nbsp;での検索結果 ー {`${bookmarks.length}`}件
      </div>
    );
  };

  useEffect(() => {
    const searchKeyword = searchParams.get('search_keyword');
    setSearchKeyword(searchKeyword);
    removeFilter();
  }, [searchParams]);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <DndContext
      onDragStart={(e) => handleDragStart(e, setActiveId)}
      onDragEnd={(e) => handleDragEnd(e, setActiveId)}
    >
      <div className="flex-grow grid grid-cols-5 max-w-7xl w-full mx-auto mt-12 mb-8 h-80">
        <Sidebar />
        <div className="col-span-4 max-w-5xl w-full mx-auto px-8">
          {message()}
          <div className="overflow-y-auto grid grid-cols-3 gap-x-4 gap-y-4 pb-12">
            {bookmarks.length === 0 ? (
              <NoContents />
            ) : (
              bookmarks.map((bookmark) => {
                return (
                  <Card
                    key={bookmark.id}
                    id={bookmark.id}
                    url={bookmark.url}
                    title={bookmark.title}
                    bookmarkTags={bookmark.tags}
                    setOverlayColor={setOverlayColor}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <DragOverlay>
        <OverlayContainer activeBookmark={activeBookmark} activeFolder={activeFolder} overlayColor={overlayColor} />
      </DragOverlay>
    </DndContext>
  );
}