'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

import { useRandomQuery } from "../../hooks/useRandomQuery";

export default function Page() {
  const { generateState, generateNonce } = useRandomQuery();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const state = generateState();
    const nonce = generateNonce();
    sessionStorage.setItem('state', state);
    setQuery(`response_type=code&client_id=${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_CALLBACK_URL}&state=${state}&scope=profile%20openid&nonce=${nonce}&prompt=consent&bot_prompt=normal&initial_amr_display=lineqr`);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center max-w-7xl mx-auto">
      <div>
        <div className="my-12 text-xl">LINEアカウント連携</div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <div>
            LINEアカウントと連携することで未読のブックマークをLINEに通知することが出来ます。
          </div>
          <div>
            下のボタンを押して、LINEにログインしてください。
          </div>
        </div>
        <Link
          href={`https://access.line.me/oauth2/v2.1/authorize?${query}`}
        >
          <button
            className="rounded-md p-2 bg-emerald-400 hover:bg-emerald-200 hover:scale-95"
          >
            LINEにログインする
          </button>
        </Link>
      </div>
    </div>
  )
}