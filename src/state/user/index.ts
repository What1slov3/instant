import { createSlice } from '@reduxjs/toolkit';
import { thunkGetMe, thunkUpdateUser } from './thunk';
import { thunkCreateChannel } from '@state/channels/thunk';
import type { UserState } from '@customTypes/index';

const initialState: UserState = {
  _id: '',
  username: '',
  tag: '',
  avatar: '',
  email: '',
  channels: [],
  createdAt: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkGetMe.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(thunkCreateChannel.fulfilled, (state, action) => {
      state.channels.push(action.payload._id);
    });
    builder.addCase(thunkUpdateUser.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
