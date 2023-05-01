import { thunkDeleteMessage, thunkGetHistory, thunkSendMessage } from './thunk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Message, MessagesState } from '@shared/types';

const initialState: MessagesState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state[action.payload.context.chatId].unshift(action.payload);
    },
    deletedMessage: (state, action: PayloadAction<Message>) => {
      const chatId = action.payload.context.chatId;
      state[chatId].splice(
        state[chatId].findIndex((message) => action.payload._id === message._id),
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
    builder.addCase(thunkSendMessage.fulfilled, (state, action) => {
      state[action.payload.context.chatId].unshift(action.payload);
    });
    builder.addCase(thunkDeleteMessage.fulfilled, (state, action) => {
      const chatId = action.payload.context.chatId;
      state[chatId].splice(
        state[chatId].findIndex((message) => action.payload._id === message._id),
        1
      );
    });
  },
});

export const { addMessage, deletedMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
