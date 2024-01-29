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
      return res.data.tags;
    });
};

export function useFetchSelectableTags() {
  const { currentUser } = useAuthContext();
  const { data: selectableTags, error } = useSWR(
    currentUser ? ['/api/v1/tags', currentUser] : null, 
    ([url, currentUser]) => fetcher(url, currentUser),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );

  useEffect(() => {
    if (error) console.log(`error message: ${error}`);
  }, [error]);

  return {
    selectableTags,
    error,
  };
}