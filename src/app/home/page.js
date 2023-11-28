'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useFilteredBookmarks } from "../../hooks/useFilteredBookmarks";
import { useAuthContext } from "../../context/AuthContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";

export default function Page() {
  const { bookmarks, isLoading } = useFilteredBookmarks();
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  if (isLoading) {
    return <div className="flex-grow"></div>;
  }

  return (
    <>
      {bookmarks.length === 0 ? (
        <NoContents />
      ) : (
        <div className="flex-grow grid grid-cols-3 gap-x-4 gap-y-4 my-8 px-12 max-w-5xl w-full mx-auto border-4">
        {bookmarks.map((bookmark) => {
          return (
            <Card key={bookmark.id} id={bookmark.id} url={bookmark.url} title={bookmark.title} bookmarkTags={bookmark.tags} />
          );
        })}
        </div>
      )}
    </>
  );
}
