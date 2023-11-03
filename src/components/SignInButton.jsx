'use client'

import { useRouter } from "next/navigation";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../lib/initFirebase";

export default function SignInButton({ text }) {
  const router = useRouter();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
  
    if (result) {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      router.push("/home");
      return user;
    }
  };

  return (
    <button onClick={loginWithGoogle} className="p-3 my-6 rounded-full bg-emerald-400">
      {text}
    </button>
  );
}