import { NewItemForm } from 'components/NewItemForm/NewItemForm';
import { FC, useState } from 'react';
import styles from './header.module.scss';

export const Header: FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <h4>
        Запланировать новую покупку{' '}
        {isActive ? (
          <button type="button" className={styles.button} onClick={() => setIsActive(!isActive)}>
            <i className="fa-solid fa-chevron-up" />
          </button>
        ) : (
          <button type="button" className={styles.button} onClick={() => setIsActive(!isActive)}>
            <i className="fa-solid fa-chevron-down" />
          </button>
        )}
      </h4>
      <div className={isActive ? '' : styles.hidden}>
        <NewItemForm />
      </div>
    </>
  );
};
