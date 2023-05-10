import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkGetMe, thunkUpdateUserProfile } from './thunk';
import { thunkCreateChannel, thunkJoinChannelByInvite } from '@shared/state';
import type { LoadingStatus, UserState } from '@shared/types';

const initialState: UserState = {
  _id: '',
  username: '',
  tag: '',
  avatar: '',
  email: '',
  channels: [],
  createdAt: 0,
  loadingStatus: {
    status: 'idle',
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoadingStatus: (state, action: PayloadAction<LoadingStatus['loadingStatus']>) => {
      state.loadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetMe.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(thunkCreateChannel.fulfilled, (state, action) => {
      state.channels.push(action.payload._id);
    });
    builder.addCase(thunkUpdateUserProfile.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loadingStatus: { status: 'succeeded', error: null } };
    });
    builder.addCase(thunkUpdateUserProfile.pending, (state) => {
      state.loadingStatus = {
        status: 'loading',
        error: null,
      };
    });
    builder.addCase(thunkUpdateUserProfile.rejected, (state) => {
      state.loadingStatus = { status: 'failed', error: 'Error' };
    });
    builder.addCase(thunkJoinChannelByInvite.fulfilled, (state, action) => {
      state.channels.push(action.payload._id);
    });
  },
});

export const { setUserLoadingStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
