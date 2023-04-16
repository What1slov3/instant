import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CachedUser, CachedUsers } from '@customTypes/index';
import { thunkGetUsers } from './thunk';

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
