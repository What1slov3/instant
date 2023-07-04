import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Modal, SliceUI } from '@shared/types';

const initialState: SliceUI = {
  modal: {
    name: null,
    payload: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
    },
    resetModal: (state) => {
      state.modal = { name: null, payload: null };
    },
  },
});

export const { setModal, resetModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
