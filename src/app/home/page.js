'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "../../context/AuthContext";

import Card from "../../components/Card";
import NoContents from "../../components/NoContents";

export default function Page() {
  const [bookmarks, setBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  useEffect(() => {
    const getBookmarks = async () => {
      const token = await currentUser?.getIdToken();
      if (!token) {
        return
      } else {
        const config = {
          headers: { authorization: `Bearer ${token}` },
        };
        // console.log(currentUser)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks`, config);
        setBookmarks(res.data.bookmarks)
        setDataLoading(true);
      }
    }
    getBookmarks();
  }, [currentUser]);

  return (
    <>
      {dataLoading && !bookmarks.length ? <NoContents /> : <div className="flex-grow grid grid-cols-3 gap-x-4 gap-y-4 my-8 px-12 max-w-5xl mx-auto border-4">
      {bookmarks.map((bookmark) => {
        return (
          <Card key={bookmark.id} id={bookmark.id} url={bookmark.url} title={bookmark.title} bookmarkTags={bookmark.tags} />
        )
      })}
    </div>
      }
    </>
  );
}
