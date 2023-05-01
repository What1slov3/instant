import { createSlice } from '@reduxjs/toolkit';
import { thunkCreateChat, thunkGetChats } from './thunk';
import type { Chat, ChatsState } from '@shared/types';

const initialState: ChatsState = {};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(thunkGetChats.fulfilled, (state, action) => {
      const fetchedChats = action.payload.reduce((prev, curr) => {
        prev[curr._id] = curr;
        return prev;
      }, {} as Record<string, Chat>);

      return { ...state, ...fetchedChats };
    });
    builder.addCase(thunkCreateChat.fulfilled, (state, action) => {
      state[action.payload._id] = action.payload;
    })
  },
});

export const {} = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
