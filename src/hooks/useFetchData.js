import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from 'swr';

import { useAuthContext } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

const fetcher = async (url, currentUser) => {
  return currentUser?.getIdToken()
    .then((token) => {
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config);
    })
    .then((res) => {
      return res.data.bookmarks;
    });
};

export function useFetchData() {
  const { currentUser, loading } = useAuthContext();
  const { data: bookmarks, error } = useSWR(
    currentUser ? [`/api/v1/bookmarks`, currentUser] : null, 
    ([url, currentUser]) => fetcher(url, currentUser)
  );
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { selectedTags, setSelectedTags } = useSearchContext();

  useEffect(() => {
    if (!loading && bookmarks) {
      setFilteredBookmarks(bookmarks);
      setSelectedTags([]);
      setDataLoading(true);
    }
  }, [bookmarks]);

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