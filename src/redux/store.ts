import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { itemsReducer } from './slices/itemsSlice';
import { REDUX_SHOPPING_LIST_LS_KEY } from './constants';
import { lightColorSchemeReducer } from './slices/colorSchemeSlice';

export const store = configureStore({
  preloadedState: getInitState(),
  reducer: {
    items: itemsReducer,
    lightColorScheme: lightColorSchemeReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(REDUX_SHOPPING_LIST_LS_KEY, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
