import axios from "axios";
import { useEffect, useMemo, useCallback } from "react";
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

  const rootFolders = useMemo(() => {
    return folders ? folders.filter((folder) => folder.parent_id === null) : [];
  }, [folders]);

  const getFolder = (id) => {
    return folders.find((folder) => folder.id === id);
  };

  const getChildFolders = useCallback((id) => {
    return folders ? folders.filter((folder) => folder.parent_id === id) : [];
  }, [folders]);

  // ループでルートフォルダまで辿り、辿ったフォルダ名を配列に格納する
  const buildFolderPath = (folderId, path = []) => {
    let currentFolderId = folderId;

    while (currentFolderId) {
      const folder = getFolder(currentFolderId);
      if (!folder) break;

      path.unshift(folder.name);
      if (folder.parent_id === null) break;

      currentFolderId = folder.parent_id;
    }

    return path;
  };

  // buildFolderPath関数で生成した配列からフォルダのパスを示す文字列を作成する
  const getFolderPath = (folderId) => {
    const pathArray = buildFolderPath(folderId);
    return pathArray.join('/');
  };

  useEffect(() => {
    if (error) console.log(`error message: ${error}`);
  }, [error]);

  return {
    folders,
    rootFolders,
    isLoading: !folders && !error,
    error,
    getFolder,
    getChildFolders,
    getFolderPath,
  };
}