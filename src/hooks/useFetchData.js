import axios from "axios";
import { useState, useEffect } from "react";

import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

export function useFetchData() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { currentUser, loading } = useAuthContext();
  const { selectedTags, setSelectedTags } = useSearchContext();

  const setIdToken = async () => {
    const token = await currentUser?.getIdToken();
    return token;
  };

  const fetchBookmarks = async () => {
    const token = await setIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks`, config);
    return res.data.bookmarks;
  };

  useEffect(() => {
    const initPage = async () => {
      if (!loading) {
        const bookmarks = await fetchBookmarks();
        setBookmarks(bookmarks);
        setFilteredBookmarks(bookmarks);
        setSelectedTags([]);
        setDataLoading(true);
      }
    };
    initPage();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedTags.length) {
      setFilteredBookmarks(bookmarks);
    } else {
      const result = bookmarks.filter((bookmark) =>
        selectedTags.every((selectedTag) =>
          bookmark.tags.some((tag) => tag.name === selectedTag)
        )
      );
      setFilteredBookmarks(result);
    }
  }, [selectedTags]);

  return {
    filteredBookmarks,
    dataLoading
  };
}