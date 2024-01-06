import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

export function useNotification() {
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

  const createNotification = async () => {
    const config = await setIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notification`,
      {},
      config
    );
    return res.status;
  };

  return {
    createNotification,
  };
}