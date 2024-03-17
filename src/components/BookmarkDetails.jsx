import { useForm } from "react-hook-form";

export default function BookmarkDetails({ id, title, url, thumbnail, note, tags, folder_id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            className="rounded-md px-2 py-1 border"
            {...register("bookmark.title")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="note">ノート</label>
          <textarea
            id="note"
            className="rounded-md px-2 py-1 border"
            {...register("bookmark.caption")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="folder">フォルダ</label>
          <input
            id="folder"
            type="text"
            className="rounded-md px-2 py-1 border"
            {...register("folderPath")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="tags">タグ</label>
          <input
            id="tags"
            className="rounded-md px-2 py-1 border"
            {...register("bookmark.tags")}
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