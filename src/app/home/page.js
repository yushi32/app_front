'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DndContext } from '@dnd-kit/core';

import { useFilteredBookmarks } from "../../hooks/useFilteredBookmarks";
import { useBookmark } from "../../hooks/useBookmark";
import { useFolder } from "../../hooks/useFolder";
import { useAuthContext } from "../../context/AuthContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";
import Sidebar from "../../components/Sidebar";

export default function Page() {
  const { bookmarks, isLoading } = useFilteredBookmarks();
  const { putBookmarkInFolder } = useBookmark();
  const { updateParentFolder } = useFolder();
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  const handleDragEnd = (e) => {
    const isDropped = e.over;
    const isFolder = isNaN(e.active.id);

    if (isDropped) {
      // draggedItemIdはブックマークとフォルダのどちらも入る
      const draggedItemId = e.active.id;
      const parentFolderId = e.over.id;

      if (isFolder) {
        // フォルダをドラッグした時の処理

        // ドラッグ&ドロップを識別するためのidからフォルダのidを取り出す処理
        const identifiers = draggedItemId.split(':');
        const childFolderId = parseInt(identifiers[0]);

        if (childFolderId !== parentFolderId) updateParentFolder(childFolderId, parentFolderId);
      } else {
        // ブックマークをドラッグした時の処理
        putBookmarkInFolder(draggedItemId, parentFolderId);
      }
    }
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex-grow grid grid-cols-5 max-w-7xl w-full mx-auto my-12">
        <Sidebar />
        <div className="col-span-4 grid grid-cols-3 gap-x-4 gap-y-4 max-w-5xl w-full mx-auto px-8">
          {bookmarks.length === 0 ? (
            <NoContents />
          ) : bookmarks.map((bookmark) => {
            return (
              <Card key={bookmark.id} id={bookmark.id} url={bookmark.url} title={bookmark.title} bookmarkTags={bookmark.tags} />
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}
