import { Item } from 'models/itemTypes';
import { REDUX_SHOPPING_LIST_LS_KEY } from './constants';

interface InitialReduxState {
  items: Item[];
}

export const getInitState = (): InitialReduxState => {
  const dataFromLS = localStorage.getItem(REDUX_SHOPPING_LIST_LS_KEY);
  return dataFromLS ? JSON.parse(dataFromLS) : [];
};

export const initState = getInitState();
