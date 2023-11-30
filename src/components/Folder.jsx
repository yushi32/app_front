import { useState } from "react";
import Image from "next/image";

export default function Folder({ text, id, name, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openChildFolder = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center justify-between border-l-2 border-transparent hover:border-emerald-200"
      >
        <button
          onClick={openChildFolder}
          className="flex-1 text-left text-sm font-medium h-full py-2.5 pl-2"
        >
          {text || name}
        </button>
        {isHovered && (
          <button
            onClick={() => console.log('edit')}
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