import axios from "axios";
import { mutate } from "swr";

import { useAuthContext } from "../context/AuthContext";

export function useFolder() {
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

  const createFolder = async (input) => {
    const config = await setIdToken();
    const data = {
      folder: { name: input }
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folders`,
      data,
      config
    );
    if (res.status = 200) {
      mutate([`/api/v1/folders`, currentUser]);
      console.log('New folder is successfully created');
      return res.data.folder;
    } else {
      console.log('Sorry, failed');
    }
  };

  return {
    createFolder
  };
};