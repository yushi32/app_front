export default function BookmarkDetails({ id, title, url, thumbnail, tags, folder_id }) {

  return (
    <div className="flex flex-col w-[600px] min-h-[600px] px-12">
      {thumbnail &&
        <div className="pb-6 border-b">
          <div className="relative mx-auto w-[320px]">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="rounded-md mx-auto w-full aspect-[1/0.525]"
            />
          </div>
        </div>
      }
      <form className="mt-6 space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            value={title}
            className="rounded-md px-2 py-1 border"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="note">ノート</label>
          <textarea
            id="note"
            className="rounded-md px-2 py-1 border"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="folder">フォルダ</label>
          <input
            id="folder"
            className="rounded-md px-2 py-1 border"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="tags">タグ</label>
          <input
            id="tags"
            className="rounded-md px-2 py-1 border"
          >
          </input>
        </div>
        <button
          type="submit"
          className="float-right rounded-md px-2 py-1 bg-emerald-200 hover:bg-emerald-400"
        >
          更新
        </button>
      </form>
    </div>
  );
}