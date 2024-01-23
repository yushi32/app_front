import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

export function useUser() {
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

  const getUserInfo = async () => {
    const config = await setIdToken();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`,
      config
    )
    return res.data.user;
  };

  const updateLineUserId = async (lineIdToken) => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'X-LINE-AccessToken': lineIdToken,
      }
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`,
      {},
      config
    );
    return res.status;
  };

  return {
    getUserInfo,
    updateLineUserId,
  };
}