import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDroppable, useDraggable, useDndContext } from '@dnd-kit/core';

import { useToggleForm } from "../hooks/useToggleForm";
import { useFolder } from "../hooks/useFolder";
import { useSearchContext } from "../context/SearchContext";
import { useFetchFolders } from "../hooks/useFetchFolders";

import FolderSortingArea from "../components/FolderSortingArea";

export default function Folder({ level = 0, id, name }) {
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
  const { editFolderName, deleteFolder } = useFolder();
  const { selectedFolderId, setSelectedFolderId, handleFilteringByFolder } = useSearchContext();

  /**
   * バックエンドから返却されるJSONには孫フォルダのデータが含まれないため、
   * 孫フォルダのデータを取得する関数と管理するstateを定義
   */
  const { getFolder, getChildFolders } = useFetchFolders();
  const [childFolders, setChildFolders] = useState([]);

  const folderRef = useRef(null);
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `${id}:store`,
  });
  const { isDragging, attributes, listeners, setNodeRef: setDraggableNodeRef } = useDraggable({
    // ブックマークとフォルダがドラッグ可能なので、idの衝突を避ける
    id: `${id}:folder`,
  });
  const style = {
    opacity: isDragging ? 0 : undefined,
  };
  const { active, over } = useDndContext();

  const hasChildren = childFolders?.length !== 0;
  const isSelected = selectedFolderId === id;

  const bgStyle = isOver ? 'bg-emerald-200' : 'bg-transparent';
  const borderStyle = `border-l-2 ${isHovered || isSelected ? 'border-emerald-200' : ''}`

  const handleClickFolder = () => {
    if (!isOpen && hasChildren) {
      setIsOpen(true);
    } else if (isOpen && isSelected) {
      setIsOpen(false);
    }
    handleFilteringByFolder(id);
  };

  const handleClickDelete = () => {
    deleteFolder(id);
    if (isSelected) setSelectedFolderId(null);
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
    if (isSelected && hasChildren) setIsOpen(true);
  }, [getChildFolders]);

  /**
   * ドロップ対象になっているフォルダに背景色を追加して分かりやすくする
   * フォルダをドラッグしている場合は自身に重なっているかどうかを検知する
   */
  useEffect(() => {
    if (active && Number.isInteger(active.id)) {
      setIsSelf(false)
    } else {
      const identifiers = active?.id.split(':');
      if (identifiers) {
        const draggedId = parseInt(identifiers[0]);
        if (over?.id !== draggedId) {
          setIsSelf(false);
        }
      }
    }
  }, [over]);

  useEffect(() => {
    if (!hasChildren) setIsOpen(false);
  }, [hasChildren]);

  return (
    <>
      <div className="flex flex-col">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClickFolder}
          style={style}
          className={`w-full h-2.5 ${bgStyle} ${borderStyle}`}>
        </button>
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
            ${isOver && !isSelf ? 'bg-emerald-200' : ''}
            ${isDragging && 'bg-white opacity-50'}
            ${borderStyle}
          `}
        >
          {form ? (
            <div ref={formRef} className="flex w-full">
              <form
                onSubmit={handleOnSubmit}
                className={`flex items-center my-1.5 ml-2 rounded-full w-4/5 border ${isFocused ? "border-blue-400" : ""}`}
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="focus:outline-none rounded-full w-full border border-transparent text-sm p-0.5 pl-2"
                />
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full bg-emerald-200 hover:bg-emerald-400 hover:scale-95 text-sm w-6 h-5"
                >
                  -
                </button>
              </form>
              <button
                onClick={handleClickDelete}
                className="ml-auto mr-1"
              >
                <Image
                  src="/delete.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="hover:rotate-12 transition-transform duration-300"
                />
              </button>
            </div>
          ) : (
            <div className="flex w-full">
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
                className={`flex-1 text-left text-sm font-medium h-full w-full ${!isHovered && 'pl-2'}`}
              >
                {name}
              </button>
            </div>
          )}
          {!isDragging && !form && isHovered && (
            <button
              onClick={openForm}
              className="mr-1"
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
          {!isDragging &&
            <FolderSortingArea
              id={id}
              setIsHovered={setIsHovered}
              handleClick={handleClickFolder}
              bgStyle={bgStyle}
              borderStyle={borderStyle}
            />
          }
      </div>
      {isOpen && (
        <>
          {hasChildren && <FolderSortingArea id={id} topSort={true} />}
          {childFolders?.map((folder) => (
            <div key={folder.id} className="pl-4">
              <Folder level={level + 1} id={folder.id} name={folder.name} parentId={folder.parent_id} />
            </div>
          ))}
          {level === 0 && <div className="w-full h-4"></div>}
        </>
      )}
    </>
  );
}