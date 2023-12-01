import { useState } from "react";
import Image from "next/image";

import { useToggleForm } from "../hooks/useToggleForm";

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
  } = useToggleForm();

  const openChildFolder = () => {
    setIsOpen(prev => !prev);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    setInput('');
    setForm(false)
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center justify-center ${!form && 'justify-between'} border-l-2 border-transparent hover:border-emerald-200`}
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
            {text || name}
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