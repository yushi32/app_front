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
      return res.data.folders;
    });
};

export function useFetchFolders() {
  const { currentUser } = useAuthContext();
  const { data: folders, error } = useSWR(
    currentUser ? [`/api/v1/folders`, currentUser] : null, 
    ([url, currentUser]) => fetcher(url, currentUser)
  );

  const getFolderName = (id) => {
    const folder = folders.find((folder) => folder.id === id);
    return folder.name;
  };

  useEffect(() => {
    if (error) console.log(`error message: ${error}`);
  }, [error]);

  return {
    folders,
    isLoading: !folders && !error,
    error,
    getFolderName
  };
}