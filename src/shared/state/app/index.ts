import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AppState } from '@shared/types';

const initialState: AppState = {
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
    updateAppSettings: (state, action: PayloadAction<Partial<AppState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { updateAppSettings } = appSlice.actions;
export const appReducer = appSlice.reducer;
