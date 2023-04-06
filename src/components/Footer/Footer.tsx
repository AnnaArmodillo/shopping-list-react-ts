import { ModalMemo as Modal } from 'components/Modal/Modal';
import { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllItems, getItemsSelector } from 'redux/slices/itemsSlice';
import { ListInfo } from 'components/ListInfo/ListInfo';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  const items = useSelector(getItemsSelector);
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
  const childrenClear = useMemo(
    () => (
      <>
        <div className={styles.modalQuestion}>Точно очистить весь список?</div>
        <div className={styles.buttonsModalWrapper}>
          <button onClick={closeModalClearHandler} className={styles.buttonCancel} type="button">
            Отмена
          </button>
          <button onClick={clearHandler} className={styles.buttonSubmit} type="button">
            Очистить
          </button>
        </div>
      </>
    ),
    [],
  );
  return (
    <>
      {items.length ? (
        <button type="button" className={styles.buttonClear} onClick={openModalClearHandler}>
          Очистить весь список
        </button>
      ) : null}
      <ListInfo />
      <Modal isModalOpen={isModalClearOpen} closeModalHandler={closeModalClearHandler}>
        {childrenClear}
      </Modal>
    </>
  );
};
