import { thunkEditMessage, thunkGetHistory } from './thunk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Message, SliceMessages } from '@shared/types';

const initialState: SliceMessages = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state[action.payload.chatId].unshift(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<Message>) => {
      const chatId = action.payload.chatId;
      state[chatId].splice(
        state[chatId].findIndex(message => action.payload.id === message.id),
        1
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkGetHistory.fulfilled, (state, action) => {
      const data = action.payload;
      if (!state[data.chatId]) {
        state[data.chatId] = [];
      }
      state[data.chatId].push(...data.history);
    });
    builder.addCase(thunkEditMessage.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state[data.chatId].findIndex(state => state.id === data.id);
      state[data.chatId][index] = data;
    });
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
