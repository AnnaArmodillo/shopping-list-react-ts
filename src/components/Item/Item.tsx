import { Item } from 'models/itemTypes';
import { FC, useCallback, useState } from 'react';
import { ACTIVE, BOUGHT, DELETED } from 'redux/constants';
import classNames from 'classnames';
import { Modal } from 'components/Modal/Modal';
import styles from './item.module.scss';

export const ListItem: FC<Item> = ({ id, status, title, cost }) => {
  console.log(id, status, title, cost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModalHandler() {
    setIsModalOpen(true);
  }
  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  function changeStatusHandler() {
    console.log('change status');
  }
  function deleteHandler() {
    console.log('delete', id);
    closeModalHandler();
  }
  return (
    <div className={styles.item}>
      <div className={styles.infoWrapper}>
        <div
          // onInput={getNewTitleHandler}
          // onMouseDown={buttonSaveShowHandler}
          // suppressContentEditableWarning
          // contentEditable
          className={status === BOUGHT ? styles.itemInfoDone : ''}
        >
          {title}
        </div>
        <div // onInput={getNewCostHandler}
          // onMouseDown={buttonSaveShowHandler}
          // suppressContentEditableWarning
          // contentEditable
          className={status === BOUGHT ? styles.itemInfoDone : ''}
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
            { [styles.buttonMarkAsBought]: status === ACTIVE },
            { [styles.buttonMarkAsActive]: status === BOUGHT },
          )}
          onClick={changeStatusHandler}
        >
          {status === DELETED ? 'Вернуть' : 'Пометить как купленное'}
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
