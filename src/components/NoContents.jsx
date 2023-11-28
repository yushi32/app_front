'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function NoContent() {
  const [num, setNum] = useState();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 7);
    setNum(randomIndex + 1);
  }, []); 

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="text-center py-4 mt-4 mb-4">
        <div className="mb-4">
          おや？まだ保存したブックマークがないようですね。
        </div>
        <div>
          Chrome拡張機能をインストールして Laterless を始めましょう。
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
