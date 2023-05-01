import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkGetUsers } from './thunk';
import type { CachedUser, CachedUsers } from '@shared/types';

const initialState: CachedUsers = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserCache: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetUsers.fulfilled, (state, action: PayloadAction<CachedUser[]>) => {
      action.payload.forEach((cachingUser) => {
        state[cachingUser._id] = cachingUser; 
      });
    });
  },
});

export const {} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
