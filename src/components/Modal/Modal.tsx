import { FC, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

interface ModalInnerProps {
  closeModalHandler: () => void;
  children: React.ReactNode;
}

const ModalInner: FC<ModalInnerProps> = ({ closeModalHandler, children }) => {
  useEffect(() => {
    function closeModalByEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeModalHandler();
      }
    }
    document.addEventListener('keydown', closeModalByEscape);
    return () => {
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, []);
  function closeModalByClickX() {
    closeModalHandler();
  }
  return (
    <div className={styles.modalInner}>
      <button className={styles.buttonClose} type="button" onClick={closeModalByClickX}>
        <i className="fa-solid fa-xmark" />
      </button>
      {children}
    </div>
  );
};

interface ModalProps extends ModalInnerProps {
  isModalOpen: boolean;
}

const Modal: FC<ModalProps> = ({ children, isModalOpen, closeModalHandler }) => {
  function closeModalByClickWrapper(event: React.MouseEvent): void {
    if (event.target === event.currentTarget) {
      closeModalHandler();
    }
  }
  if (!isModalOpen) return null;
  return createPortal(
    <div
      role="button"
      tabIndex={0}
      onMouseDown={closeModalByClickWrapper}
      className={styles.modalOuter}
    >
      <ModalInner closeModalHandler={closeModalHandler}>{children}</ModalInner>
    </div>,
    document.getElementById('modal')!,
  );
};

export const ModalMemo = memo(Modal);
