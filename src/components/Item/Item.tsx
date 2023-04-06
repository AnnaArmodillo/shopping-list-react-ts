import { Item } from 'models/itemTypes';
import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Modal } from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { changeItemStatus, deleteItem, editItem } from 'redux/slices/itemsSlice';
import styles from './item.module.scss';

export const ListItem: FC<Item> = ({ id, active, title, cost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCost, setNewCost] = useState(cost);
  const dispatch = useDispatch();
  function openModalHandler() {
    setIsModalOpen(true);
  }
  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  const closeModalErrorHandler = useCallback(() => {
    setIsModalErrorOpen(false);
  }, [setIsModalErrorOpen]);
  function changeStatusHandler() {
    dispatch(changeItemStatus(id));
  }
  function deleteHandler() {
    dispatch(deleteItem(id));
    closeModalHandler();
  }
  function saveHandler() {
    if (newTitle.length >= 2 && newTitle.length <= 20 && +newCost > 0) {
      dispatch(editItem({ id, title: newTitle, cost: newCost }));
      setIsContentEditable(false);
    } else {
      setIsModalErrorOpen(true);
    }
  }
  function getNewTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.innerText);
  }
  function getNewCostHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewCost(event.target.innerText);
  }
  function cancelChangeHandler() {
    const costId = `#cost${id}`;
    const titleId = `#title${id}`;
    document.querySelector(`${costId}`)!.closest('div')!.innerText = cost;
    document.querySelector(`${titleId}`)!.closest('div')!.innerText = title;
    setIsContentEditable(false);
  }
  return (
    <>
      <div className={classNames(styles.item, !active ? styles.itemDone : '')}>
        <div className={styles.infoWrapper}>
          <div
            onInput={getNewTitleHandler}
            id={`title${id}`}
            suppressContentEditableWarning
            contentEditable={isContentEditable}
            className={!active ? styles.itemInfoDone : ''}
          >
            {title}
          </div>
          <div className={styles.costWrapper}>
            <div
              onInput={getNewCostHandler}
              id={`cost${id}`}
              suppressContentEditableWarning
              contentEditable={isContentEditable}
              className={!active ? styles.itemInfoDone : ''}
            >
              {cost}
            </div>
            <div>руб.</div>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <button type="button" className={styles.buttonDelete} onClick={openModalHandler}>
            Удалить
          </button>
          <button
            type="button"
            className={classNames(
              { [styles.buttonMarkAsBought]: active },
              { [styles.buttonMarkAsActive]: !active },
            )}
            onClick={changeStatusHandler}
          >
            {active ? 'Пометить как купленное' : 'Вернуть'}
          </button>
          {isContentEditable ? (
            <>
              <button
                type="button"
                className={styles.buttonSave}
                title="сохранить изменения"
                onClick={saveHandler}
              >
                <i className="fa-solid fa-floppy-disk" />
              </button>
              <button
                type="button"
                className={styles.buttonRestore}
                title="отменить изменения"
                onClick={cancelChangeHandler}
              >
                <i className="fa-solid fa-arrow-rotate-left" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.buttonEdit}
              title="редактировать"
              onClick={() => setIsContentEditable(true)}
            >
              <i className="fa-solid fa-pen" />
            </button>
          )}
        </div>
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
      <Modal isModalOpen={isModalErrorOpen} closeModalHandler={closeModalErrorHandler}>
        <div className={styles.modalQuestion}>
          Наименование должно содержать от 2 до 20 символов, и цена должна быть положительным числом
        </div>
        <div className={styles.buttonsModalWrapper}>
          <button onClick={closeModalErrorHandler} className={styles.buttonCancel} type="button">
            Понятно
          </button>
        </div>
      </Modal>
    </>
  );
};
