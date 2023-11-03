'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "../../context/AuthContext";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

export default function Page() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  const { logout } = useFirebaseAuth();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  return <button onClick={logout}>ログアウト</button>;
}