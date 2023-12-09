import { useState, useEffect } from "react"
import Link from "next/link";
import Image from"next/image";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";

import { useBookmark } from "../hooks/useBookmark";

import Tag from "./Tag";
import AddTag from "./AddTag";

export default function Card({ id, url, title, bookmarkTags }) {
  const { isDeleted, deleteBookmark } = useBookmark();
  const [randomColor, setRandomColor] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [tags, setTags] = useState([]);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform)
  };

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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      className="col-span-1 rounded-md shadow-md hover:shadow-2xl mx-1 h-64 flex flex-col justify-between border-6 bg-white"
    >
      <div
        ref={setNodeRef}
        className="flex flex-col h-full"
      >
        <div className={`rounded-t-md ${randomColor} flex-1 h-[50%]`}>
          {isHovered && 
            <Image
              {...listeners}
              {...attributes}
              src="/draggable.svg"
              alt="draggable"
              width={20}
              height={20}
              className="m-2"
            />
          }
        </div>
        <Link
          href={url}
          target="_blank"
          className="
            px-3
            pt-3
            pb-1
            text-center
            text-sm
            overflow-scroll
            h-[50%]
            flex
            flex-col
            justify-center
            hover:underline
            hover:decoration-emerald-300
            underline-offset-4
          "
        >
          {title}
        </Link>
      </div>
      <div className="flex justify-between place-items-end px-2 py-1">
        <div className="flex-1 flex-wrap flex gap-1 items-center">
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
