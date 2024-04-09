import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useFetchFolders } from "../hooks/useFetchFolders";

import DisplayTag from "./DisplayTag";

const setFormStyle = (focusId, currentId) => (
  `rounded-md px-2 py-1 border ${focusId === currentId ? 'focus:outline-none border-blue-400' : ''}`
);

export default function BookmarkDetails({ id, title, url, thumbnail, note, tags, folder_id }) {
  const [focusedForm, setFocusedForm] = useState(null);
  const [submitTags, setSubmitTags] = useState([]);
  const [isTagInvalid, setIsTagInvalid] = useState(false);
  const { getFolderPath } = useFetchFolders();
  const folderPath = getFolderPath(folder_id);
  const {
    register,
    reset,
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

  const handleOnChangeTagsField = (e) => {
    const input = e.target.value;
    // 半角スペースまたは全角スペースで始まっている場合、不正な入力であることを示す
    if (input.match(/^[ \u3000]/)) {
      setIsTagInvalid(true);
      return;
    }

    // 先頭が半角スペースまたは全角スペースではなくなった時、ボーダーの色を戻す
    if (isTagInvalid) setIsTagInvalid(false);

    // タグの末尾に半角スペースまたは全角スペースが入力された時、タグを確定する
    if (input.match(/[ \u3000]$/)) {
      const tagName = input.trimEnd();
      const newTag = { id: tagName, name: tagName };
      setSubmitTags([...submitTags, newTag]);
      reset();
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key == 'Backspace' || e.key === 'Delete') {
      const input = e.target.value;
      if (!input && submitTags.length > 0) {
        const newSubmitTags = [...submitTags];
        newSubmitTags.pop();
        setSubmitTags(newSubmitTags);
      }
    }
  };

  useEffect(() => {
    setSubmitTags(tags);
  }, []);

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
            className={`${setFormStyle(focusedForm, 'title')}`}
            {...register("bookmark.title", {
              onBlur: handleOnBlur
            })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="note">ノート</label>
          <textarea
            id="note"
            onFocus={() => handleOnFocus('note')}
            className={`${setFormStyle(focusedForm, 'note')}`}
            {...register("bookmark.note", {
              onBlur: handleOnBlur
            })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="folder">フォルダ</label>
          <input
            id="folder"
            type="text"
            onFocus={() => handleOnFocus('folder')}
            className={`${setFormStyle(focusedForm, 'folder')}`}
            {...register("folderPath", {
              onBlur: handleOnBlur
            })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="tags">タグ</label>
          <div className={`
            flex
            items-center
            space-x-1
            ${setFormStyle(focusedForm, 'tags')}
            ${isTagInvalid ? 'border-red-600 caret-red-600 ' : ''}
          `}>
            {submitTags.length > 0 &&
              submitTags.map((tag) => <DisplayTag key={tag.id} name={tag.name} />)
            }
            <input
              id="tags"
              onFocus={() => handleOnFocus('tags')}
              onKeyDown={(e) => handleOnKeyDown(e)}
              className="w-full pl-1 focus:outline-none"
              {...register("bookmark.tags", {
                onChange: (e) => {
                  handleOnChangeTagsField(e);
                },
                onBlur: handleOnBlur
              })}
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