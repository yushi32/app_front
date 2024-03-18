import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFetchFolders } from "../hooks/useFetchFolders";

import Tag from "./Tag";

const setFormStyle = (focusId, currentId) => (
  `rounded-md px-2 py-1 border ${focusId === currentId ? 'focus:outline-none border-blue-400' : ''}`
);

export default function BookmarkDetails({ id, title, url, thumbnail, note, tags, folder_id }) {
  const [focusedForm, setFocusedForm] = useState(null);
  const { getFolderPath } = useFetchFolders();
  const folderPath = getFolderPath(folder_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      'bookmark.title': title,
      'bookmark.note': note,
      'folderPath': folderPath,
      'bookmark.tags': null,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleOnFocus = (field) => {
    setFocusedForm(field);
  };

  const handleOnBlur = () => {
    setFocusedForm(null);
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
            onFocus={() => handleOnFocus('title')}
            onBlur={handleOnBlur}
            className={`${setFormStyle(focusedForm, 'title')}`}
            {...register("bookmark.title")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="note">ノート</label>
          <textarea
            id="note"
            onFocus={() => handleOnFocus('note')}
            onBlur={handleOnBlur}
            className={`${setFormStyle(focusedForm, 'note')}`}
            {...register("bookmark.note")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="folder">フォルダ</label>
          <input
            id="folder"
            type="text"
            onFocus={() => handleOnFocus('folder')}
            onBlur={handleOnBlur}
            className={`${setFormStyle(focusedForm, 'folder')}`}
            {...register("folderPath")}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="tags">タグ</label>
          <div className={`flex items-center space-x-1 ${setFormStyle(focusedForm, 'tags')}`}>
            {tags.length > 0 &&
              tags.map((tag) => <Tag key={tag.id} name={tag.name} isDisabled={true} />)
            }
            <input
              id="tags"
              onFocus={() => handleOnFocus('tags')}
              onBlur={handleOnBlur}
              className="w-full pl-1 focus:outline-none"
              {...register("bookmark.tags")}
            />
          </div>
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