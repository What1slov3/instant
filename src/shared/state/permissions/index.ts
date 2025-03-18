import { createSlice } from '@reduxjs/toolkit';
import { thunkGetPermissions } from './thunk';
import type { SlicePermissions } from '@shared/types';

const initialState: SlicePermissions = {
  chat: {},
  channel: {},
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(thunkGetPermissions.fulfilled, (state, action) => {
      const context = action.meta.arg.context;
      const contextId = action.payload.contextId;

      state[context][contextId] = action.payload.rule;
    });
  },
});

export const {} = permissionsSlice.actions;
export const permissionsReducer = permissionsSlice.reducer;
