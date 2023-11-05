'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "../../context/AuthContext";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

export default function Page() {
  const [bookmarks, setBookmarks] = useState([]);
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  const { logout } = useFirebaseAuth();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  useEffect(() => {
    const getBookmarks = async () => {
      const token = await currentUser?.getIdToken();
      if (!token) {
        return
      } else {
        const config = {
          headers: { authorization: `Bearer ${token}` },
        };
        console.log(currentUser)
        const res = await axios.get('http://localhost:3000/api/v1/bookmarks', config);
        setBookmarks(res.data.data)
        console.log(res.data.data);
      }
    }
    getBookmarks();
  }, [currentUser]);

  return <button onClick={logout}>ログアウト</button>;
}