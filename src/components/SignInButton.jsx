'use client'

import useFirebaseAuth from "../hooks/useFirebaseAuth";

export default function SignInButton({ text }) {
  const { loginWithGoogle } = useFirebaseAuth();

  return (
    <button onClick={loginWithGoogle} className="p-3 mx-2 my-6 rounded-full bg-emerald-400">
      {text}
    </button>
  );
}