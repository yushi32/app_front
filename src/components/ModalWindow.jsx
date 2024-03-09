import { Dialog } from "primereact/dialog";

import BookmarkDetails from "./BookmarkDetails";
        
export default function ModalWindow({ isModalOpen, setIsModalOpen, selectedBookmark }) {
  return (
    <Dialog
      visible={isModalOpen}
      onHide={() => setIsModalOpen(false)}
    >
      <BookmarkDetails {...selectedBookmark} />
    </Dialog>
  );
};
