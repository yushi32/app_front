import Image from "next/image";

import { useFetchFolders } from "../hooks/useFetchFolders";

import Folder from "./Folder";
import AddFolder from "./AddFolder";

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
        <AddFolder />
      </div>
      <Folder text={'All'} />
      {folders?.map((folder) => {
        return <Folder key={folder.id} name={folder.name} children={folder.children} />;
      })}
    </div>
  );
}