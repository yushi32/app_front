import Image from "next/image";

import { useFetchFolders } from "../hooks/useFetchFolders";

import Folder from "./Folder";
import AddFolder from "./AddFolder";
import Inbox from "./Inbox";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const { rootFolders, isLoading } = useFetchFolders();

  return (
    <div className="col-span-1 flex flex-col border-r-2 px-4 overflow-y-auto">
      <div className="flex items-center justify-center justify-between pb-4">
        <Image
          src="/folder.svg"
          alt="folder"
          width={32}
          height={32}
        />
        <AddFolder />
      </div>
        <div className="space-y-0.5">
          <Inbox />
          {rootFolders?.map((folder) => {
            return <Folder key={folder.id} id={folder.id} name={folder.name} children={folder.children} />;
          })}
        </div>
        <SidebarFooter />
    </div>
  );
}