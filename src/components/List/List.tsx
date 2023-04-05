import { ListItem } from 'components/Item/Item';
import { useSelector } from 'react-redux';
import { getItemsSelector } from 'redux/slices/itemsSlice';
import { FC } from 'react';
import styles from './list.module.scss';

export const List: FC = () => {
  const items = useSelector(getItemsSelector);
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  );
};
