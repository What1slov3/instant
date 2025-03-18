import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Chat, Message, Modal, SliceUI } from '@shared/types';
import { thunkEditMessage } from '../messages/thunk';

const initialState: SliceUI = {
  modal: {
    name: null,
    payload: null,
  },
  messages: {
    editing: {},
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
    },
    resetModal: state => {
      state.modal = { name: null, payload: null };
    },

    markMessageAsEditing: (state, action: PayloadAction<{ chatId: Chat['id']; message: Message }>) => {
      state.messages.editing[action.payload.chatId] = action.payload.message;
    },
    unmarkMessageAsEditing: (state, action: PayloadAction<{ chatId: Chat['id']; messageId: Message['id'] }>) => {
      if (state.messages.editing[action.payload.chatId]) {
        delete state.messages.editing[action.payload.chatId];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkEditMessage.fulfilled, (state, action) => {
      if (state.messages.editing[action.payload.chatId]) {
        delete state.messages.editing[action.payload.chatId];
      }
    });
  },
});

export const { setModal, resetModal, markMessageAsEditing, unmarkMessageAsEditing } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
