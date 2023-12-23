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
    <div className="flex-grow flex flex-col max-w-5xl mx-auto pt-12 pb-16 text-neutral-700 bg-red-20">
      <div className="mb-8">
        <div>
          <div className="text-2xl font-semibold text-center">LINEアカウント連携</div>
        </div>
        <div className="flex flex-col text-center">
          <div className="py-4 bg-blue-2">
            <div>
              LINEアカウントと連携することで未読のブックマークをLINEに通知することが出来ます。
            </div>
            <div>
              下記の手順に従って、LINEアカウントを連携してください。
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col items-center">
          <h2 className="w-full text-center text-xl font-bold border-b-2 p-2">手順1</h2>
          <div className="mt-4 mb-2">
            <div>下のボタンを押して、LINEにログインしてください。</div>
            <div>LINEのログインページにリダイレクトされます。</div>
          </div>
          <Link
            href={`https://access.line.me/oauth2/v2.1/authorize?${query}`}
          >
            <button
              className="rounded-md p-2 bg-emerald-400 text-black hover:bg-emerald-200 hover:scale-95"
            >
              LINEにログインする
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="w-full text-center text-xl font-bold border-b-2 p-2">手順2</h2>
          <div className="mt-4 mb-2">
            <div>ログイン後、同意画面が表示されるので下部にある「許可する」を押してください。</div>
            <div>「許可する」を押した後、またこちらのページにリダイレクトされます。</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="w-full text-center text-xl font-bold border-b-2 p-2">手順3</h2>
          <div className="mt-4 mb-2">
            <div>こちらのページに戻ってきたら、下の「連携する」ボタンを押してください。</div>
          </div>
          <button
            className="rounded-md p-2 bg-emerald-400 text-black hover:bg-emerald-200 hover:scale-95"
          >
            連携する
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="w-full text-center text-xl font-bold border-b-2 p-2">手順4</h2>
          <div className="mt-4 mb-2 space-y-4">
            <div className="flex flex-col items-center">
              <div>LINEとの連携は以上で完了です。</div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div>通知を受け取るためには、laterless公式アカウントの友だち追加が必要です。</div>
                <div>まだお済みでない方はこちらのQRコードから友だち追加してください。</div>
              </div>
              <div className="w-36 h-36 bg-red-200"></div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div>未読のブックマークの通知機能をONにしたい方は下のボタンを押してください。</div>
              <button
                className="rounded-md p-2 bg-emerald-400 text-black hover:bg-emerald-200 hover:scale-95"
              >
                通知をONにする
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm">＊現在は毎週土曜日の夜8時に通知されるようになっています。</div>
              <div className="text-sm">今後、通知日時を変更する機能を追加予定です。しばらくお待ちください。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}