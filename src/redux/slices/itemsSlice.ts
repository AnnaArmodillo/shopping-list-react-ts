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
        state.push(action.payload);
      },
      prepare(title: string, cost: number) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title,
            cost,
            status: 'active',
          },
        };
      },
    },
  },
});

export const { addNewItem } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
export const getItemsSelector = (state: RootState) => state.items;
