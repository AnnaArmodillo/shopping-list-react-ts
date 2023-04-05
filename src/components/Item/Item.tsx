import { Item } from 'models/itemTypes';
import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Modal } from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { changeItemStatus } from 'redux/slices/itemsSlice';
import styles from './item.module.scss';

export const ListItem: FC<Item> = ({ id, active, title, cost }) => {
  console.log(id, active, title, cost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  function openModalHandler() {
    setIsModalOpen(true);
  }
  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  function changeStatusHandler() {
    dispatch(changeItemStatus(id));
  }
  function deleteHandler() {
    closeModalHandler();
  }
  return (
    <div className={classNames(styles.item, !active ? styles.itemDone : '')}>
      <div className={styles.infoWrapper}>
        <div
          // onInput={getNewTitleHandler}
          // onMouseDown={buttonSaveShowHandler}
          // suppressContentEditableWarning
          // contentEditable
          className={!active ? styles.itemInfoDone : ''}
        >
          {title}
        </div>
        <div // onInput={getNewCostHandler}
          // onMouseDown={buttonSaveShowHandler}
          // suppressContentEditableWarning
          // contentEditable
          className={!active ? styles.itemInfoDone : ''}
        >
          {cost} руб.
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <button type="button" className={styles.buttonDelete} onClick={openModalHandler}>
          Удалить
        </button>
        <button
          type="button"
          className={classNames(
            styles.button,
            { [styles.buttonMarkAsBought]: active },
            { [styles.buttonMarkAsActive]: !active },
          )}
          onClick={changeStatusHandler}
        >
          {active ? 'Пометить как купленное' : 'Вернуть'}
        </button>
        {/* <button
          className={isSaveHidden ? styles.buttonHidden : styles.button}
          onClick={handleSave}
        >
          Сохранить
        </button> */}
      </div>
      <Modal isModalOpen={isModalOpen} closeModalHandler={closeModalHandler}>
        <div className={styles.modalQuestion}>Точно удалить &quot;{title}&quot; из списка?</div>
        <div className={styles.buttonsModalWrapper}>
          <button onClick={closeModalHandler} className={styles.buttonCancel} type="button">
            Отмена
          </button>
          <button onClick={deleteHandler} className={styles.buttonSubmit} type="button">
            Удалить
          </button>
        </div>
      </Modal>
    </div>
  );
};
