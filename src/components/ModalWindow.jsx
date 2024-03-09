import { Dialog } from "primereact/dialog";
        
export default function ModalWindow({ isModalOpen, setIsModalOpen }) {
  return (
    <Dialog visible={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <p>
        モーダルだよ
      </p>
    </Dialog>
  );
};
