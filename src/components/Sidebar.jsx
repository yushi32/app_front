import Image from "next/image";

import { useFetchFolders } from "../hooks/useFetchFolders";

import Folder from "./Folder";

export default function Sidebar() {
  const { folders, isLoading } = useFetchFolders();

  return (
    <div className="col-span-1 flex flex-col border-r-2 px-4">
      <div className="flex items-center justify-center justify-between pb-4">
        <Image
          src="/folder.svg"
          alt="folder"
          width={32}
          height={32}
        />
        <button
          className="rounded-full bg-emerald-200 text-lg px-2 hover:bg-emerald-400 hover:scale-95 border border-emerald-200 hover:border-emerald-400"
        >
          +
        </button>
      </div>
      <Folder text={'All'} />
      {folders?.map((folder) => {
        return <Folder key={folder.id} name={folder.name} children={folder.children} />;
      })}
    </div>
  );
}