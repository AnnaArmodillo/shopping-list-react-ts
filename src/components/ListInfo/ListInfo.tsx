import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getItemsSelector } from 'redux/slices/itemsSlice';
import styles from './listInfo.module.scss';

export const ListInfo: FC = () => {
  const items = useSelector(getItemsSelector);
  const sumPlanned = items.filter((item) => item.active).reduce((acc, el) => acc + +el.cost, 0);
  const sumFact = items.filter((item) => !item.active).reduce((acc, el) => acc + +el.cost, 0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.planned}>
        {sumPlanned > 0
          ? `Вы собираетесь потратить ${sumPlanned} руб.`
          : `Вы не собираетесь тратить деньги`}
      </div>
      <div className={styles.fact}>
        {sumFact > 0 ? `Вы потратили уже ${sumFact} руб.` : `Вы не потратили ни рубля`}
      </div>
    </div>
  );
};
