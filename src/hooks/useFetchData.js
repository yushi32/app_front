import axios from "axios";
import { useState, useEffect } from "react";

import { useAuthContext } from "../context/AuthContext";

export default function useFetchData() {
  const [bookmarks, setBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { currentUser, loading } = useAuthContext();

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
        setDataLoading(true);
      }
    };
    initPage();
  }, [currentUser]);

  return {
    bookmarks,
    dataLoading
  };
}