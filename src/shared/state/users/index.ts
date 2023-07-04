import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkGetUsers } from './thunk';
import type { CachedUser, SliceUserCache } from '@shared/types';

const initialState: SliceUserCache = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsersCache: (state, action: PayloadAction<CachedUser | CachedUser[]>) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((user) => {
          state[user.id] = { ...user, timestamp: Date.now() };
        });
      } else {
        state[action.payload.id] = { ...action.payload, timestamp: Date.now() };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetUsers.fulfilled, (state, action: PayloadAction<CachedUser[]>) => {
      action.payload.forEach((user) => {
        state[user.id] = { ...user, timestamp: Date.now() };
      });
    });
  },
});

export const { updateUsersCache } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
