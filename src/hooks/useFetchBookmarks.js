import axios from "axios";
import { useEffect } from "react";
import useSWR from 'swr';

import { useAuthContext } from "../context/AuthContext";

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

export function useFetchBookmarks() {
  const { currentUser } = useAuthContext();
  const { data: bookmarks, error } = useSWR(
    currentUser ? [`/api/v1/bookmarks`, currentUser] : null, 
    ([url, currentUser]) => fetcher(url, currentUser)
  );

  const totalBookmarksCount = bookmarks ? bookmarks.length : 0;

  useEffect(() => {
    if (error) console.log(`error message: ${error}`);
  }, [error]);

  return {
    bookmarks,
    error,
    totalBookmarksCount
  };
}