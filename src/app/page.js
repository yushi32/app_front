export default function Home() {
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
          <button className="p-3 my-6 rounded-full bg-emerald-400">
            今すぐ始める
          </button>
        </div>
      </div>
      <div className="my-8 p-8">
        <div className="flex justify-between justify-center my-5 p-2 max-w-5xl mx-auto">
          <div className="w-1/2 m-2 p-5">SVGアイコン</div>
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
      </div>
    </>
  )
}
