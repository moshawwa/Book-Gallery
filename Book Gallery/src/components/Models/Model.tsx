import React from "react";
import { createPortal } from "react-dom";
import ModalBackdrop from "./ModelBackdrop";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ showModal, onClose, children }: ModalProps) => {
  return (
    <>
      {showModal && <ModalBackdrop onClose={onClose} />}
      {showModal &&
        createPortal(
          <div
            onClick={onClose}
            className="modal fade show"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
