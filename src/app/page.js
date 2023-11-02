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
    </>
  )
}
