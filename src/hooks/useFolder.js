import axios from "axios";
import { mutate } from "swr";

import { useAuthContext } from "../context/AuthContext";
import { useFetchFolders } from "../hooks/useFetchFolders";

export function useFolder() {
  const { currentUser } = useAuthContext();
  const { folders, getFolder } = useFetchFolders();

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

  const editFolderName = async (id, input) => {
    const config = await setIdToken();
    const data ={
      folder: { name: input }
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folders/${id}`,
      data,
      config
    );
    mutate([`/api/v1/folders`, currentUser]);
  };
  
  const updateParentFolder = async (folderId, parentId) => {
    const config = await setIdToken();
    const data ={
      folder: { parent_id: parentId }
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folders/${folderId}`,
      data,
      config
    );
    mutate([`/api/v1/folders`, currentUser]);
  };

  const sortFolder = async (targetId, prevId) => {
    // 現在の並び順からソート後の前後のフォルダを取得する
    const prevIndex = folders.findIndex(folder => folder.id === prevId);
    const prevFolder = folders[prevIndex];
    const nextFolder = folders[prevIndex + 1];
    
    const sortedPosition = (prevFolder.position + nextFolder.position) / 2;

    const config = await setIdToken();
    const data ={
      folder: { position: sortedPosition },
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folders/${targetId}`,
      data,
      config
    );
    mutate([`/api/v1/folders`, currentUser]);
  };

  return {
    createFolder,
    editFolderName, 
    updateParentFolder,
    sortFolder,
  };
};