import { createPortal } from "react-dom";

type ModalBackdropProps = {
  onClose: () => void;
};

const ModalBackdrop = ({ onClose }: ModalBackdropProps) => {
  return createPortal(
    <div onClick={onClose} className="modal-backdrop fade show"></div>,
    document.body
  );
};

export default ModalBackdrop;
