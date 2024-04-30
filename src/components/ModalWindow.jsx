import { useEffect } from "react";
import { Dialog } from "primereact/dialog";

import BookmarkDetails from "./BookmarkDetails";
        
export default function ModalWindow({ isModalOpen, setIsModalOpen, selectedBookmark }) {
  useEffect(() => {
    const handleClickMask = (event) => {
      if (event.target.classList.contains('p-dialog-mask')) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', handleClickMask);
    return () => {
      document.removeEventListener('click', handleClickMask);
    };
  }, [setIsModalOpen]);

  return (
    <Dialog
      visible={isModalOpen}
      onHide={() => setIsModalOpen(false)}
    >
      <BookmarkDetails {...selectedBookmark} setIsModalOpen={setIsModalOpen} />
    </Dialog>
  );
};
