import { Modal } from 'components/Modal/Modal';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAllItems } from 'redux/slices/itemsSlice';
import { ListInfo } from 'components/ListInfo/ListInfo';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  const dispatch = useDispatch();
  const [isModalClearOpen, setIsModalClearOpen] = useState(false);
  const closeModalClearHandler = useCallback(() => {
    setIsModalClearOpen(false);
  }, [setIsModalClearOpen]);
  function openModalClearHandler() {
    setIsModalClearOpen(true);
  }
  function clearHandler() {
    dispatch(clearAllItems());
    closeModalClearHandler();
  }
  return (
    <>
      <button type="button" className={styles.buttonClear} onClick={openModalClearHandler}>
        Очистить весь список
      </button>
      <ListInfo />
      <Modal isModalOpen={isModalClearOpen} closeModalHandler={closeModalClearHandler}>
        <div className={styles.modalQuestion}>Точно очистить весь список?</div>
        <div className={styles.buttonsModalWrapper}>
          <button onClick={closeModalClearHandler} className={styles.buttonCancel} type="button">
            Отмена
          </button>
          <button onClick={clearHandler} className={styles.buttonSubmit} type="button">
            Очистить
          </button>
        </div>
      </Modal>
    </>
  );
};
