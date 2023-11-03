'use client';

import { createContext, useContext } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const { currentUser, loading, loginWithGoogle, logout } = useFirebaseAuth();

  const context = {
    currentUser: currentUser,
    loading: loading,
    loginWithGoogle: loginWithGoogle,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);