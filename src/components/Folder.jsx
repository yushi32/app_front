import { useState, useEffect } from "react";
import Image from "next/image";
import { useDroppable } from '@dnd-kit/core';

import { useToggleForm } from "../hooks/useToggleForm";
import { useFolder } from "../hooks/useFolder";
import { useSearchContext } from "../context/SearchContext";

export default function Folder({ text, id, name, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
  const { editFolder } = useFolder();
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const { selectedFolderId, handleFilteringByFolder } = useSearchContext();

  const openChildFolder = () => {
    setIsOpen(prev => !prev);
    handleFilteringByFolder(id);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input !== 0) {
      await editFolder(id, input);
      setForm(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setInput(name);
  }, []);

  useEffect(() => {
    const isSelected = selectedFolderId === id;
    const isParent = children?.some((child) => child.id === selectedFolderId);
    if (isOpen && !isSelected && !isParent) {
      setIsOpen(false);
    }
  }, [selectedFolderId]);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={setNodeRef}
        className={`
          flex
          items-center
          justify-center
          ${!form && 'justify-between'}
          border-l-2
          ${selectedFolderId === id ? 'border-emerald-200' : 'border-transparent'}
          hover:border-emerald-200
          ${isOver ? 'bg-blue-200' : undefined}
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
              className={"focus:outline-none rounded-full border border-transparent text-sm p-0.5 pl-2"}
            />
            <button
              type="button"
              onClick={closeForm}
              className={`rounded-full bg-emerald-200 hover:bg-emerald-400 hover:scale-95 text-sm w-6 h-6 ml-4`}
            >
              -
            </button>
          </form>
        </>
        ) : (
          <button
            onClick={openChildFolder}
            className="flex-1 text-left text-sm font-medium h-full py-2.5 pl-2"
          >
            {input || text || name}
          </button>
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
      {isOpen && children && children?.map((folder) => {
        return (
          <div key={folder.id} className="pl-4">
            <Folder id={folder.id} name={folder.name} children={folder.children} />
          </div>  
          );
      })}
    </>
  );
}