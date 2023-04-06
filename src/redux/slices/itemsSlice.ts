import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'models/itemTypes';
import { RootState } from 'redux/store';
import { initState } from '../initState';

const itemsSlice = createSlice({
  name: 'items',
  initialState: initState.items,
  reducers: {
    addNewItem: {
      reducer(state, action: PayloadAction<Item>) {
        state.unshift(action.payload);
      },
      prepare(title: string, cost: string) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title,
            cost,
            active: true,
          },
        };
      },
    },
    changeItemStatus(state, action: PayloadAction<Item['id']>) {
      const currentItem = state.find((item) => item.id === action.payload);
      currentItem!.active = !currentItem!.active;
    },
    deleteItem(state, action: PayloadAction<Item['id']>) {
      return state.filter((item) => item.id !== action.payload);
    },
    editItem(state, action: PayloadAction<Pick<Item, 'id' | 'cost' | 'title'>>) {
      const currentItem = state.find((item) => item.id === action.payload.id);
      currentItem!.cost = action.payload.cost;
      currentItem!.title = action.payload.title;
    },
    clearAllItems() {
      return [];
    },
    changeItemsOrder(state, action: PayloadAction<Array<Item>>) {
      return action.payload;
    },
  },
});

export const {
  addNewItem,
  changeItemStatus,
  deleteItem,
  editItem,
  clearAllItems,
  changeItemsOrder,
} = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
export const getItemsSelector = (state: RootState) => state.items;
