'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from"next/image";

import { useAuthContext } from "../context/AuthContext";

import Footer from "../components/Footer";
import SignInButton from "../components/SignInButton";
import ExtensionButton from "../components/ExtensionButton";

export default function Page() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/home');
    }
  }, [currentUser, loading]);

  return (
    <>
      <div className="w-full bg-neutral-800 text-white">
        <div className="flex justify-center flex-col items-center">
          <p className="mt-6 pt-6 text-xl">
            後で読もうと思ったまま
          </p>
          <p className="mb-6 text-xl">
            放置している記事、ありませんか？
          </p>
          <p className="my-6 text-xl">
            Laterlessでブックマークを効率的に管理しましょう
          </p>
          <SignInButton text="今すぐ始める" />
        </div>
      </div>
      <div className="my-8 p-8">
        <div className="flex justify-between justify-center my-5 p-2 max-w-5xl mx-auto">
          <div className="w-1/2 flex items-center">
            <Image src="/notification.svg" alt="Notification" width={100} height={100} className="flex mx-auto" />
          </div>
          <div className="w-1/2 flex justify-center flex-col items-center gap-4 mx-4 p-8 bg-emerald-100">
            <h3 className="m-4 text-xl">
              通知機能
            </h3>
            <p className="text-center">
              ブックマークした記事を設定したタイミングであなたのLINEへ通知します。
            </p>
            <p className="text-center">
              ブックマークして終わりの生活とはお別れです。
            </p>
          </div>
        </div>
        <div className="flex justify-between justify-center my-5 p-2 max-w-5xl mx-auto">
          <div className="w-1/2 flex justify-center flex-col items-center gap-4 mx-4 p-8 bg-emerald-100">
            <h3 className="m-4 text-xl">
              ブックマーク管理をもっと手軽に
            </h3>
            <p className="text-center">
              Laterlessでは、ブックマークした時に自動でタグを設定します。
            </p>
            <p className="text-center">
              ブックマークする度にフォルダを選択する煩わしさから解放されましょう。
            </p>
          </div>
          <div className="w-1/2 flex items-center">
            <Image src="tag.svg" alt="Tag" width={100} height={100} className="flex mx-auto" />
          </div>
        </div>
        <div className="flex justify-between justify-center my-5 p-2 max-w-5xl mx-auto">
          <div className="w-1/2 flex items-center">
            <Image src="/extension.svg" alt="Chrome-Extension" width={100} height={100} className="flex mx-auto" />
          </div>
          <div className="w-1/2 flex justify-center flex-col items-center gap-4 mx-4 p-8 bg-emerald-100">
            <h3 className="m-4 text-xl">
              ブックマーク登録もシームレス
            </h3>
            <p className="text-center">
              Chrome拡張機能をインストールすることで今見ているページから移動せずにLaterlessへ登録できます。
            </p>
            <ExtensionButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
