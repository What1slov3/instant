import { createSlice } from '@reduxjs/toolkit';
import { thunkCreateChat, thunkGetChats, thunkUpdateChat } from './thunk';
import type { Chat, SliceChats } from '@shared/types';

const initialState: SliceChats = {};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(thunkGetChats.fulfilled, (state, action) => {
      const fetchedChats = action.payload.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {} as Record<string, Chat>);

      return { ...state, ...fetchedChats };
    });
    builder.addCase(thunkCreateChat.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });
    builder.addCase(thunkUpdateChat.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });
  },
});

export const {} = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
