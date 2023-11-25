'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useFetchData } from "../../hooks/useFetchData";
import { useAuthContext } from "../../context/AuthContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";

export default function Page() {
  const { filteredBookmarks, dataLoading } = useFetchData();
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  return (
    <>
      {dataLoading && !filteredBookmarks.length ? <NoContents /> : <div className="flex-grow grid grid-cols-3 gap-x-4 gap-y-4 my-8 px-12 max-w-5xl mx-auto border-4">
      {filteredBookmarks.map((bookmark) => {
        return (
          <Card key={bookmark.id} id={bookmark.id} url={bookmark.url} title={bookmark.title} bookmarkTags={bookmark.tags} />
        )
      })}
    </div>
      }
    </>
  );
}
