import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { initState } from '../initState';

const lightColorSchemeSlice = createSlice({
  name: 'lightColorScheme',
  initialState: initState.lightColorScheme,
  reducers: {
    changeColorScheme(state) {
      return !state;
    },
  },
});

export const { changeColorScheme } = lightColorSchemeSlice.actions;
export const lightColorSchemeReducer = lightColorSchemeSlice.reducer;
export const getLightColorSchemeSelector = (state: RootState) => state.lightColorScheme;
