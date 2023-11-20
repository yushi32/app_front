'use client';

import axios from "axios";
import liff from "@line/liff"
import { useEffect, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";


export default function Page() {
  const { currentUser, loading } = useAuthContext();
  const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    if (!loading) {
    // liff初期化
    liff.init({
      liffId: LIFF_ID,
      // 他のブラウザで開いたときは初期化と一緒にログインもさせるオプション
      withLoginOnExternalBrowser: true
    });
    // LINEログイン画面に遷移

    liff.ready
      .then(async () => {
        // LINEログイン画面に遷移してログインすると、ここでidTokenが取得できる
        const idToken = liff.getIDToken();
        const body ={ idToken: idToken };

        // バックエンドにリクエストを送るためのトークンを準備
        const token = await currentUser?.getIdToken();
        if (!token) {
          return
        } else {
          // リクエストヘッダーとボディを準備
          const config = {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            //body: body
          };
          const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, body, config);
          console.log(res);
        }


      })
    }
  }, [loading]);

  const logoutFromLiff = () => {
    liff.logout();
  };

  const requestToAPI = async () => {
    liff.ready
      .then(async () => {
        // LINEログイン画面に遷移してログインすると、ここでidTokenが取得できる
        const idToken = liff.getIDToken();
        const body ={ idToken: idToken };

        // バックエンドにリクエストを送るためのトークンを準備
        const token = await currentUser?.getIdToken();
        if (!token) {
          return
        } else {
          // リクエストヘッダーとボディを準備
          const config = {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            //body: body
          };
          const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, body, config);
          console.log(res);
        }


      })
  };

  return (
    <>
      <div>
        <button onClick={logoutFromLiff} className="border-2 bg-blue-300">liffからログアウト</button>
      </div>
      <div>
        <button onClick={requestToAPI} className="border-2 bg-red-300">バックエンドにリクエスト</button>
      </div>
    </>
  );
}