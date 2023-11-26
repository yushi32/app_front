import axios from "axios";
import { useState } from "react";

import { useAuthContext } from "../context/AuthContext";

export function useBookmark() {
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser } = useAuthContext();

  const setIdToken = async () => {
    const token = await currentUser?.getIdToken();
    return token;
  };

  const deleteBookmark = async (id) => {
    const token = await setIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${id}`, config);
    if (res.status === 204) {
      setIsDeleted(true);
      console.log('Successfully deleted');
    } else {
      console.log('Failed to delete');
    }
  };

  const addTagToBookmark = async (bookmarkId, newTagName) => {
    const token = await setIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${bookmarkId}`,
      { bookmark: { tag_name: newTagName }},
      config
    );
    return res.data.bookmark.tags;
  };

  return {
    isDeleted,
    setIsDeleted,
    deleteBookmark,
    addTagToBookmark
  };
};