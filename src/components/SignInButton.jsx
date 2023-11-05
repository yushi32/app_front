'use client'

import axios from "axios";

import useFirebaseAuth from "../hooks/useFirebaseAuth";

export default function SignInButton({ text }) {
  const { loginWithGoogle } = useFirebaseAuth();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/authentication`, null, config);
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    };
    verifyIdToken();
  };

  return (
    <button onClick={handleGoogleLogin} className="p-3 mx-2 my-6 rounded-full bg-emerald-400">
      {text}
    </button>
  );
}