import axios from "axios";
import { mutate } from "swr";

import { useAuthContext } from "../context/AuthContext";
import { useFetchFolders } from "../hooks/useFetchFolders";

export function useFolder() {
  const { currentUser } = useAuthContext();
  const { folders, getFolder, getChildFolders } = useFetchFolders();

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

  // 現在の並び順からソート後の前後のフォルダを取得し、ソート後のpositionを求める関数
  const calculateSortedPosition = (prevId) => {
    const prevIndex = folders.findIndex(folder => folder.id === prevId);
    const prevFolder = folders[prevIndex];
    const nextFolder = folders[prevIndex + 1];

    if (!prevFolder) {
      // 先頭に移動した場合
      return folders[0].position / 2;
    } else if (!nextFolder) {
      // 末尾に移動した場合
      return folders.slice(-1)[0].position + 65535.0;
    } else {
      // その他
      return (prevFolder.position + nextFolder.position) / 2;
    }
  };

  // 2つのフォルダが同じ階層にあるかどうかを判定する関数
  const isSameLayer = (currentParentId, targetParentId) => {
    return currentParentId === targetParentId;
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
    const sortedPosition = calculateSortedPosition(prevId);

    // ソートするフォルダと移動先の階層が違った場合、parent_idも更新する
    const targetFolder = getFolder(targetId);
    const prevFolder = getFolder(prevId);
    const flag = isSameLayer(targetFolder.parent_id, prevFolder.parent_id);

    const config = await setIdToken();
    const data = {
      folder: {
        position: sortedPosition,
        ...(flag || { parent_id: prevFolder.parent_id }),
      }
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/folders/${targetId}`,
      data,
      config
    );
    mutate([`/api/v1/folders`, currentUser]);
  };

  // 別のフォルダの先頭にソートした場合の処理を担う関数
  const prependToParentFolder = async (targetId, parentId) => {
    const firstChild = getChildFolders(parentId)[0];
    const firstChildIndex = folders.findIndex(folder => folder.id === firstChild.id);
    const prevFolder = folders[firstChildIndex - 1];

    const sortedPosition = calculateSortedPosition(prevFolder.id);
    const targetFolder = getFolder(targetId);
    const flag = isSameLayer(targetFolder.parent_id, parentId);

    const config = await setIdToken();
    const data = {
      folder: {
        position: sortedPosition,
        ...(flag || { parent_id: parentId }),
      }
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
    prependToParentFolder,
  };
};