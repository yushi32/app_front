import axios from "axios";
import { useState } from "react"
import Link from "next/link";


import { useAuthContext } from "../context/AuthContext"

export default function Card({ id, url, title }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser } = useAuthContext();

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
    <div className="col-span-1 rounded-md shadow-md hover:shadow-xl mt-4 mx-1 h-64 flex flex-col justify-between border-6">
      <Link href={url} className="flex flex-col h-full">
      <div className={`rounded-t-md bg-neutral-800 flex-1 h-[50%]`}></div>

        <div className="px-3 pt-3 pb-1 text-center overflow-scroll h-[50%] flex flex-col justify-center">
            <span className="text-center text-sm">{title}</span>
        </div>
      </Link>
      <div className=" flex justify-between px-2 py-1">
        <div>
          <button className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95">
            #タグ
          </button>
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
