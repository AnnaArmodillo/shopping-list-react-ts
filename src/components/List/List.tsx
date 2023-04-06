import { ListItem } from 'components/Item/Item';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemsOrder, getItemsSelector } from 'redux/slices/itemsSlice';
import { FC, useEffect, useState } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import styles from './list.module.scss';

export const List: FC = () => {
  const items = useSelector(getItemsSelector);
  const [listItems, setListItems] = useState(items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeItemsOrder(listItems));
  }, [listItems]);
  return (
    <Reorder.Group axis="y" values={items} onReorder={setListItems} className={styles.list}>
      <AnimatePresence>
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ListItem key={item.id} {...item} />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
