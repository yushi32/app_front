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

  return (
    <div className="col-span-1 text-center rounded shadow-md bg-yellow-200 mt-4 mx-1 max-h-72 p-3">
      <Link href={url}>
        {title}
      </Link>
      <button
        onClick={()=> {onClickDelete(id)}}

      >削除</button>
    </div>
  );
}