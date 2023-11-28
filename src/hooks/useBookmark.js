import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

import { useAuthContext } from "../context/AuthContext";

export function useBookmark() {
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser } = useAuthContext();

  const setIdToken = async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  };

  const deleteBookmark = async (id) => {
    const config = await setIdToken();
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${id}`, config);
    if (res.status === 204) {
      setIsDeleted(true);
      mutate([`/api/v1/bookmarks`, currentUser]);
      console.log('Successfully deleted');
    } else {
      console.log('Failed to delete');
    }
  };

  const addTagToBookmark = async (bookmarkId, newTagName) => {
    const config = await setIdToken();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${bookmarkId}`,
      { bookmark: { tag_name: newTagName } },
      config
    );
    mutate([`/api/v1/bookmarks`, currentUser]);
    return res.data.bookmark.tags;
  };

  return {
    isDeleted,
    setIsDeleted,
    deleteBookmark,
    addTagToBookmark
  };
};