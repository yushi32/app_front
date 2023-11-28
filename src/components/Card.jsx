import { useState, useEffect } from "react"
import Link from "next/link";
import Image from"next/image";

import { useBookmark } from "../hooks/useBookmark";

import Tag from "./Tag";
import AddTag from "./AddTag";

export default function Card({ id, url, title, bookmarkTags }) {
  const { isDeleted, deleteBookmark } = useBookmark();
  const [randomColor, setRandomColor] = useState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (bookmarkTags.length !== 0) {
      setTags(bookmarkTags);
    }

    const colors = [
      'bg-red-300',
      'bg-blue-300',
      'bg-green-400',
      'bg-amber-200',
      'bg-purple-200',
      'bg-neutral-700',
      'bg-teal-200',
      'bg-pink-200',
      'bg-orange-300'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[randomIndex]);
  }, []); 

  if (isDeleted) {
    return null;
  }

  const onClickEdit = () => {};

  return (
    <div className="col-span-1 rounded-md shadow-md hover:shadow-2xl mt-4 mx-1 h-64 flex flex-col justify-between border-6">
      <Link href={url} className="flex flex-col h-full">
      <div className={`rounded-t-md ${randomColor} flex-1 h-[50%]`}></div>

        <div className="px-3 pt-3 pb-1 text-center overflow-scroll h-[50%] flex flex-col justify-center">
          <p className="text-center text-sm">{title}</p>
        </div>
      </Link>
      <div className="flex justify-between place-items-end px-2 py-1">
        <div className="flex-1 flex-wrap flex gap-1">
          {tags.length !==0 && tags.map((tag) => {
            return <Tag key={tag.id} name={tag.name} />
          })}
          <AddTag tags={tags} setTags={setTags} bookmarkId={id} />
        </div>
        <div className="flex items-center justify-center">
          <button onClick={onClickEdit}>
            <Image
              src="/pencil.svg"
              alt="edit"
              width={24}
              height={24}
              className="hover:rotate-12 transition-transform duration-300"
            />
          </button>
          <button onClick={() => deleteBookmark(id)}>
            <Image
              src="/delete.svg"
              alt="delete"
              width={24}
              height={24}
              className="hover:rotate-12 transition-transform duration-300"
            />
          </button>
        </div>
      </div>      
    </div>
  );  
}
