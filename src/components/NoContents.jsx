'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

import { useFetchBookmarks } from "../hooks/useFetchBookmarks";
import { useFetchFolders } from "../hooks/useFetchFolders";
import { useSearchContext } from "../context/SearchContext";

export default function NoContent() {
  const [num, setNum] = useState();
  const { selectedFolderId, searchKeyword } = useSearchContext();
  const { totalBookmarksCount } = useFetchBookmarks();
  const { getFolder } = useFetchFolders();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 7);
    setNum(randomIndex + 1);
  }, []); 

  const message = () => {
    if (searchKeyword) {
      return (
        <>
          タイトル又はタグに&nbsp;
          <span className="font-semibold">{searchKeyword}</span>
          &nbsp;を含むブックマークは見つかりませんでした。
        </>
      );
    } else if (totalBookmarksCount !== 0) {
      return `${getFolder(selectedFolderId).name} にはまだブックマークが保存されていません。`;
    } else {
      return (
        <>
          <p>おや？まだ保存したブックマークがないようですね。</p>
          <p>Chrome拡張機能をインストールして Laterless を始めましょう。</p>
        </>
      );
    }
  };

  return (
    <div className="col-span-3 flex-grow flex flex-col items-center justify-center">
      <div className="text-center py-4 mt-4 mb-8">
        <div className="space-y-4">
          {message()}
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Image 
          src={`/no_content_${num}.svg`}
          alt='No contents'
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
