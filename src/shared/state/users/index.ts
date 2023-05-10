import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkGetUsers } from './thunk';
import type { CachedUser, UsersCache, User } from '@shared/types';

const initialState: UsersCache = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsersCache: (state, action: PayloadAction<CachedUser | CachedUser[]>) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((user) => {
          state[user._id] = { ...user, timestamp: Date.now() };
        });
      } else {
        state[action.payload._id] = { ...action.payload, timestamp: Date.now() };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetUsers.fulfilled, (state, action: PayloadAction<CachedUser[]>) => {
      action.payload.forEach((user) => {
        state[user._id] = { ...user, timestamp: Date.now() };
      });
    });
  },
});

export const { updateUsersCache } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
