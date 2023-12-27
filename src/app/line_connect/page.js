'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthContext } from "../../context/AuthContext";
import { useRandomQuery } from "../../hooks/useRandomQuery";
import { useLineApi } from "../../hooks/useLineApi";
import { useUser } from "../../hooks/useUser";

export default function Page() {
  const { currentUser, loading } = useAuthContext();
  const { generateState, generateNonce } = useRandomQuery();
  const { getAccessToken, logout } = useLineApi();
  const { updateLineUserId } = useUser();
  const [query, setQuery] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // 手順1,2が完了しているかどうかをクエリパラメータの有無で判断する
  const code = searchParams.get('code');

  const linkLineAccount = async () => {
    const requestState = sessionStorage.getItem('state');
    const responseState = searchParams.get('state');

    // LINEログインをリクエストした時に設定したクエリパラメータがレスポンスに含まれているかどうかを検証する
    if (requestState === responseState) {
      const res = await getAccessToken();
      const lineIdToken = res.id_token;
      const statusCode = await updateLineUserId(lineIdToken);
      if (statusCode === 204) setIsLinked(true);

      // アプリ上ではLINEアカウントを使用しないので、連携処理が終わったらログアウトさせる
      const lineAccessToken = res.access_token;
      await logout(lineAccessToken);
    }
  };

  useEffect(() => {
    const state = generateState();
    const nonce = generateNonce();
    if (!sessionStorage.getItem('state')) {
      sessionStorage.setItem('state', state);
      setQuery(`response_type=code&client_id=${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_CALLBACK_URL}&state=${state}&scope=profile%20openid&nonce=${nonce}&prompt=consent&bot_prompt=normal&initial_amr_display=lineqr`);
    }
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading]);

  return (
    <div className="flex-grow flex flex-col max-w-5xl mx-auto pt-12 pb-16 text-neutral-700 bg-red-20">
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-center">
            LINEアカウント連携
          </h1>
        </div>
        <div className="flex flex-col text-center">
          <div className="py-4 bg-blue-2">
            <p>
              LINEアカウントと連携することで未読のブックマークをLINEに通知することが出来ます。
            </p>
            <p>
              下記の手順に従って、LINEアカウントを連携してください。
            </p>
            <p>
              手順の途中でページを閉じたりリロードしてしまった場合は、別のタブでページを開き直してください。
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-full border-b-2 p-2 ">
            {code && <Image 
              src='/check.svg'
              alt='completed'
              width={28}
              height={28}
            />}
            <h2 className={`text-center text-xl font-bold ${code ? 'mr-7' : ''}`}>
              手順1
            </h2>
          </div>
          <div className="mt-4 mb-2">
            <p>
              下のボタンを押して、LINEにログインしてください。
            </p>
            <p>
              LINEのログインページにリダイレクトされます。
            </p>
          </div>
          <Link
            href={`https://access.line.me/oauth2/v2.1/authorize?${query}`}
          >
            <button
              disabled={code}
              className={`rounded-md p-2 text-black ${code ? 'bg-gray-200' : 'bg-emerald-400 hover:bg-emerald-200 hover:scale-95'}`}
            >
              LINEにログインする
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-full border-b-2 p-2 ">
            {code && <Image 
              src='/check.svg'
              alt='completed'
              width={28}
              height={28}
            />}
            <h2 className={`text-center text-xl font-bold ${code ? 'mr-7' : ''}`}>
              手順2
            </h2>
          </div>
          <div className="mt-4 mb-2">
            <p>
              ログイン後、同意画面が表示されるので下部にある「許可する」を押してください。
            </p>
            <p>
              「許可する」を押した後、またこちらのページにリダイレクトされます。
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-full border-b-2 p-2 ">
            {isLinked && <Image 
              src='/check.svg'
              alt='completed'
              width={28}
              height={28}
            />}
            <h2 className={`text-center text-xl font-bold ${isLinked ? 'mr-7' : ''}`}>
              手順3
            </h2>
          </div>
          <div className="mt-4 mb-2">
            <p>
              こちらのページに戻ってきたら、下の「連携する」ボタンを押してください。
            </p>
          </div>
          <button
            onClick={linkLineAccount}
            disabled={isLinked}
            className={`rounded-md p-2 text-black ${isLinked ? 'bg-gray-200' : 'bg-emerald-400 hover:bg-emerald-200 hover:scale-95'}`}
          >
            {isLinked ? '連携済み' : '連携する'}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="w-full text-center text-xl font-bold border-b-2 p-2">
            手順4
          </h2>
          <div className="mt-4 mb-2 space-y-4">
            <div className="flex flex-col items-center">
              <p>
                LINEとの連携は以上で完了です。
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <p>
                  通知を受け取るためには、laterless公式アカウントの友だち追加が必要です。
                </p>
                <p>
                  まだお済みでない方はこちらのQRコードから友だち追加してください。
                </p>
              </div>
              <img
                src="https://qr-official.line.me/gs/M_257arxyt_GW.png?oat_content=qr"
                width={240}
                height={240}
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p>
                未読のブックマークの通知機能をONにしたい方は下のボタンを押してください。
              </p>
              <button
                className="rounded-md p-2 bg-emerald-400 text-black hover:bg-emerald-200 hover:scale-95"
              >
                通知をONにする
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">
                ＊現在は毎週土曜日の夜8時に通知されるようになっています。
              </p>
              <p className="text-sm">
                今後、通知日時を変更する機能を追加予定です。しばらくお待ちください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}