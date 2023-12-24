import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

export function useUser() {
  const { currentUser } = useAuthContext();

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

  };

  return {
    updateLineUserId,
  };
}