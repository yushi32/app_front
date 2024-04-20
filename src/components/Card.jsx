import { useState, useEffect } from "react"
import Link from "next/link";
import Image from"next/image";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";

import { useBookmark } from "../hooks/useBookmark";

import Tag from "./Tag";
import AddTag from "./AddTag";

export default function Card({ setOverlayColor, openBookmarkModal, ...bookmark }) {
  const { id, url, title, thumbnail, tags: bookmarkTags } = bookmark;
  const { isDeleted, markBookmarkAsRead, deleteBookmark } = useBookmark();
  const [randomColor, setRandomColor] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [tags, setTags] = useState([]);
  const { isDragging, attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${id}:bookmark`,
  });
  const style = {
    opacity: isDragging ? 0 : undefined,
    transform: CSS.Transform.toString(transform),
  };
  const displayTitle = title.length > 100 ? title.substring(0, 99) + '...' : title;

  useEffect(() => {
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

  useEffect(() => {
    if (bookmarkTags.length !== 0) {
      setTags(bookmarkTags);
    }
  }, [bookmarkTags]);

  useEffect(() => {
    setOverlayColor(randomColor)
  }, [isDragging]);

  if (isDeleted) {
    return null;
  }

  const handleOnClickEdit = () => {
    openBookmarkModal(bookmark);
  };

  return (
    <div className="flex-grow">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={style}
        className="col-span-1 rounded-md shadow-card hover:shadow-card-hover mx-1 flex flex-col justify-between bg-white"
      >
        <div
          ref={setNodeRef}
          className="flex flex-col rounded-t-md min-h-[266px] bg-white"
        >
          {thumbnail ?
            <div className="relative border-b">
              {isHovered &&
                <Image
                  {...listeners}
                  {...attributes}
                  src="/draggable.svg"
                  alt="draggable"
                  width={20}
                  height={20}
                  className="absolute z-10 m-2"
                />
              }
              <img
                alt="thumbnail"
                className="rounded-t-md mx-auto w-full aspect-[1/0.525]"
                src={thumbnail}
              />
            </div>
          :
            <div className={`rounded-t-md ${randomColor} w-full aspect-[1/0.525]`}>
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
          }
          <div className="flex flex-col my-auto px-3 py-2">
            <Link
              href={url}
              onClick={() => markBookmarkAsRead(id)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-center
                text-sm
                hover:underline
                hover:decoration-emerald-300
                underline-offset-4
              "
            >
              {displayTitle}
            </Link>
          </div>
        </div>
        <div className="flex justify-between place-items-end px-2 py-1">
          <div className="flex-1 flex flex-wrap gap-1 items-center">
            <AddTag tags={tags} setTags={setTags} bookmarkId={id} />
            {tags.length !==0 && tags.map((tag) => {
              return <Tag key={tag.id} name={tag.name} />
            })}
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleOnClickEdit}>
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
    </div>
  );  
}
