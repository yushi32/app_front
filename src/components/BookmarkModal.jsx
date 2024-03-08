import { Dialog } from "primereact/dialog";
        
export default function BookmarkModal({ isModalOpen, setIsModalOpen }) {
  return (
    <Dialog visible={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <p>
        モーダルだよ
      </p>
    </Dialog>
  );
};
