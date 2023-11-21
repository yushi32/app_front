import axios from "axios";
import { useState, useEffect } from "react"
import Link from "next/link";
import Image from"next/image";

import { useAuthContext } from "../context/AuthContext";

import Tag from "./Tag";

export default function Card({ id, url, title, bookmarkTags }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser } = useAuthContext();
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

  const onClickDelete = async () => {
    const token = await currentUser?.getIdToken();
      if (!token) {
        return
      } else {
        const config = {
          headers: { authorization: `Bearer ${token}` },
        };
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${id}`, config);
      console.log(res);
      if (res.status === 204) {
        setIsDeleted(true);
        console.log('Successfully deleted');
      } else {
        console.log('Failed to delete');
      }
    }
  };

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
      <div className=" flex justify-between px-2 py-1">
        <div className="flex-1 flex-wrap flex gap-1">
          {tags.length !==0 && tags.map((tag) => {
            return <Tag key={tag.id} name={tag.name} />
          })}
        </div>
        <div>
          <button onClick={onClickEdit}>
            <Image
              src="/pencil.svg"
              alt="edit"
              width={24}
              height={24}
              className="transform hover:rotate-12 transition-transform duration-300"
            />
          </button>
          <button onClick={onClickDelete}>
            <Image
              src="/delete.svg"
              alt="delete"
              width={24}
              height={24}
              className="transform hover:rotate-12 transition-transform duration-300"
            />
          </button>
        </div>
      </div>      
    </div>
  );  
}
