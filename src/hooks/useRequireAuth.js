import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthContext } from "../context/AuthContext";

export function useRequireAuth() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    if (pathname === '/' && currentUser) {
      router.replace('/home');
      return;
    }

    if (pathname !== '/' && !currentUser) {
      router.replace('/');
    }
  }, [currentUser, loading, pathname]);
}