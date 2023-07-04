import { thunkDeleteMessage, thunkGetHistory, thunkSendMessage } from './thunk';
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
    deletedMessage: (state, action: PayloadAction<Message>) => {
      const chatId = action.payload.chatId;
      state[chatId].splice(
        state[chatId].findIndex((message) => action.payload.id === message.id),
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
  },
});

export const { addMessage, deletedMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
