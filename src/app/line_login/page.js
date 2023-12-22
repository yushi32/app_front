export default function Page() {
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
        <button
          className="rounded-md p-2 bg-emerald-400 hover:bg-emerald-200 hover:scale-95"
        >
          LINEにログインする
        </button>
      </div>
    </div>
  )
}