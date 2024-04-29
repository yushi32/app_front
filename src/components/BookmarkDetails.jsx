import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { useFetchFolders } from "../hooks/useFetchFolders";
import { useBookmark } from "../hooks/useBookmark";

import DisplayTag from "./DisplayTag";

const setFormStyle = (focusId, currentId) => (
  `rounded-md min-h-[36px] px-2 py-1 border ${focusId === currentId ? 'focus:outline-none border-blue-400' : ''}`
);

export default function BookmarkDetails({ id, title, url, thumbnail, note, tags, folder_id, setIsModalOpen }) {
  const [focusedForm, setFocusedForm] = useState(null);
  const [submitTags, setSubmitTags] = useState([]);
  const [isTagInvalid, setIsTagInvalid] = useState(false);
  const { getFolderPath } = useFetchFolders();
  const { updateBookmark } = useBookmark();
  const folderPath = getFolderPath(folder_id);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      'bookmark.title': title,
      'bookmark.note': note,
      'folderPath': folderPath,
      'bookmark.tags': tags,
    },
    mode: 'onChange',
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'bookmark.tags',
  });

  const onSubmit = async (data) => {
    const params = {
      title: data.bookmark.title,
      note: data.bookmark.note,
      tag_names: submitTags.map((tag) => tag.name),
    };
    const status = await updateBookmark(id, params);
    if (status === 200) setIsModalOpen(false);
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

      // 既存のタグと重複している場合、フォームの色を変更
      if (fields.some((tag) => tag.name === tagName)) {
        setIsTagInvalid(true);
        return;
      } else {
        // 重複していない場合はタグを追加
        const newTag = { id: tagName, name: tagName };
        append(newTag);
        e.target.value = '';
      }
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

  return (
    <div className="flex flex-col text-sm w-[600px] min-h-[600px] px-12">
      {thumbnail &&
        <div className="relative mx-auto w-[320px]">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="rounded-md mx-auto w-full aspect-[1/0.525]"
          />
        </div>
      }
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-3"
      >
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <label htmlFor="title">タイトル</label>
            {errors.bookmark?.title?.message && <p className="text-red-600">{errors.bookmark?.title?.message}</p>}
          </div>
          <input
            id="title"
            type="text"
            onFocus={() => handleOnFocus('title')}
            className={`${setFormStyle(focusedForm, 'title')}`}
            {...register("bookmark.title", {
              onBlur: handleOnBlur,
              required: 'タイトルは必須です。',
            })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <label htmlFor="note">ノート</label>
            {errors.bookmark?.note?.message && <p className="text-red-600">{errors.bookmark?.note?.message}</p>}
          </div>
          <textarea
            id="note"
            rows={4}
            onFocus={() => handleOnFocus('note')}
            className={`${setFormStyle(focusedForm, 'note')}`}
            {...register("bookmark.note", {
              onBlur: handleOnBlur,
              maxLength: { value: 500, message: '500文字以内で入力してください。'},
            })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="folder">フォルダ</label>
          <input
            id="folder"
            type="text"
            disabled={true}
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
            flex-wrap
            items-center
            gap-1
            ${setFormStyle(focusedForm, 'tags')}
            ${isTagInvalid ? 'border-red-600 caret-red-600 ' : ''}
          `}>
            {fields.map((item, index) => (
              <DisplayTag key={item.id} name={item.name} index={index} />
            ))}
            <Controller
              render={({ field }) => (
                <input
                  id="tags"
                  placeholder="スペースで区切ってください"
                  onChange={(e) => handleOnChangeTagsField(e)}
                  onFocus={() => handleOnFocus('tags')}
                  onKeyDown={(e) => handleOnKeyDown(e)}
                  className="flex-grow min-h-[26px] pl-1 focus:outline-none"
                />
              )}
              name="bookmark.tags"
              control={control}
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