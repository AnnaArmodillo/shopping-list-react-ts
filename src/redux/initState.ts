import { Item } from 'models/itemTypes';
import { REDUX_SHOPPING_LIST_LS_KEY } from './constants';

interface InitialReduxState {
  items: Item[];
}

export const getInitState = (): InitialReduxState => {
  const dataFromLS = localStorage.getItem(REDUX_SHOPPING_LIST_LS_KEY);
  if (dataFromLS) {
    return JSON.parse(dataFromLS);
  }
  return { items: [] };
};

export const initState = getInitState();
