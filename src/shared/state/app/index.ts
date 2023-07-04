import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { SliceApp } from '@shared/types';

const initialState: SliceApp = {
  settings: {
    messageGroupGap: 0,
    messageFontSize: 14,
  },
  inputs: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppSettings: (state, action: PayloadAction<Partial<SliceApp['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { updateAppSettings } = appSlice.actions;
export const appReducer = appSlice.reducer;
