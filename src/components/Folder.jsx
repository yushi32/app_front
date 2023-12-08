import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDroppable, useDraggable, useDndContext } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";

import { useToggleForm } from "../hooks/useToggleForm";
import { useFolder } from "../hooks/useFolder";
import { useSearchContext } from "../context/SearchContext";
import { useFetchFolders } from "../hooks/useFetchFolders";

export default function Folder({ text, id, name, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelf, setIsSelf] = useState(true);
  const {
    form,
    input,
    isFocused,
    formRef,
    setForm,
    setInput,
    openForm,
    closeForm,
    handleFocus,
    handleBlur
  } = useToggleForm(false);
  const { editFolderName } = useFolder();
  const { selectedFolderId, handleFilteringByFolder } = useSearchContext();

  /**
   * バックエンドから返却されるJSONには孫フォルダのデータが含まれないため、
   * 孫フォルダのデータを取得する関数と管理するstateを定義
   */
  const { getFolder, getChildFolders } = useFetchFolders();
  const [childFolders, setChildFolders] = useState([]);

  const folderRef = useRef(null);
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: id,
  });
  const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
    // ブックマークとフォルダがドラッグ可能なので、idの衝突を避ける
    id: `${id}:${name}`,
  });
  const style = {
    transform: CSS.Transform.toString(transform)
  };
  const { active, over } = useDndContext();

  const handleClickFolder = () => {
    const hasChildren = children?.length !== 0;
    const isSelected = selectedFolderId === id;
    if (!isOpen && hasChildren) {
      setIsOpen(true);
    } else if (isOpen && isSelected) {
      setIsOpen(false);
    }
    handleFilteringByFolder(id);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input !== 0) {
      await editFolderName(id, input);
      setForm(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setInput(name);
  }, []);

  // 選択されているフォルダの親階層に自身が含まれるかを再帰的にチェックする関数
  const hasAncestor = (folderId) => {
    const folder = getFolder(folderId);
    if (!folder) return false;
    if (folder.parent_id === id) return true;
    if (!folder.parent_id) return false;
    return hasAncestor(folder.parent_id);
  };

  useEffect(() => {
    const isSelected = selectedFolderId === id;
    if (isOpen && !isSelected && !hasAncestor(selectedFolderId)) {
      setIsOpen(false);
    }
  }, [selectedFolderId]);

  // Folderコンポーネントをドラッグ可能かつドロップ可能にする
  useEffect(() => {
    if (folderRef.current) {
      setDroppableNodeRef(folderRef.current);
      setDraggableNodeRef(folderRef.current);
    }
  }, [setDroppableNodeRef, setDraggableNodeRef]);

  // フォルダ一覧が更新されたら子フォルダの配列を取得してローカルステートを更新する
  useEffect(() => {
    setChildFolders(getChildFolders(id));
  }, [getChildFolders]);

  // ドラッグした時に自身に重なっているかどうかを検知する
  useEffect(() => {
    const identifiers = active?.id.split(':');
    if (identifiers) {
      const draggedId = parseInt(identifiers[0]);
      if (over?.id !== draggedId) {
        setIsSelf(false);
      } else {
        setIsSelf(true);
      }
    }
  }, [over]);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={folderRef}
        style={style}
        className={`
          flex
          items-center
          justify-center
          ${!form && 'justify-between'}
          border-l-2
          ${selectedFolderId === id ? 'border-emerald-200' : 'border-transparent'}
          hover:border-emerald-200
          ${isOver && !isSelf ? 'bg-emerald-200' : ''}
        `}
      >
        {form ? (
          <>
            <form
              onSubmit={handleOnSubmit}
              ref={formRef}
              className={`flex items-center my-1.5 ml-2 w-full rounded-full border ${isFocused ? "border-blue-400" : ""}`}
            >
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="focus:outline-none rounded-full border border-transparent text-sm p-0.5 pl-2"
              />
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full bg-emerald-200 hover:bg-emerald-400 hover:scale-95 text-sm w-6 h-6 ml-4"
              >
                -
              </button>
            </form>
          </>
        ) : (
          <>
            {isHovered && 
              <Image
                {...listeners}
                {...attributes}
                src="/draggable.svg"
                alt="draggable"
                width={20}
                height={20}
              />
            }
            <button
              onClick={handleClickFolder}
              className={`flex-1 text-left text-sm font-medium h-full py-2.5 ${ !isHovered && 'pl-2'}`}
            >
              {input || text || name}
            </button>
          </>
        )}
        {!form && isHovered && (
          <button
            onClick={openForm}
            className="pr-1"
          >
            <Image
              src="/pencil.svg"
              alt="edit"
              width={20}
              height={20}
              className="hover:rotate-12 transition-transform duration-300"
            />
          </button>
        )}
      </div>
      {isOpen && childFolders?.map((folder) => {
        return (
          <div key={folder.id} className="pl-4">
            <Folder id={folder.id} name={folder.name} parentId={folder.parent_id} children={folder.children} />
          </div>  
          );
      })}
    </>
  );
}