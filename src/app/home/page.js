'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DndContext } from '@dnd-kit/core';

import { useFilteredBookmarks } from "../../hooks/useFilteredBookmarks";
import { useBookmark } from "../../hooks/useBookmark";
import { useAuthContext } from "../../context/AuthContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";
import Sidebar from "../../components/Sidebar";

export default function Page() {
  const { bookmarks, isLoading } = useFilteredBookmarks();
  const { putBookmarkInFolder } = useBookmark();
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  const handleDragEnd = (e) => {
    console.log(e);
    // e.active.id: ブックマークのid（ドラッグ要素）
    const bookmarkId = e.active.id;
    // e.over.id: フォルダのid（ドロップ要素）
    const folderId = e.over.id;
    putBookmarkInFolder(bookmarkId, folderId);
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
      {bookmarks.length === 0 ? (
        <NoContents />
      ) : (
        <div className="flex-grow grid grid-cols-5 max-w-7xl w-full mx-auto my-12">
          <Sidebar />
          <div className="col-span-4 grid grid-cols-3 gap-x-4 gap-y-4 max-w-5xl w-full mx-auto px-8">
            {bookmarks.map((bookmark) => {
              return (
                <Card key={bookmark.id} id={bookmark.id} url={bookmark.url} title={bookmark.title} bookmarkTags={bookmark.tags} />
              );
            })}
          </div>
        </div>
      )}
    </DndContext>
  );
}
