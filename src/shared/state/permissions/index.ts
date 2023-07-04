import { createSlice } from '@reduxjs/toolkit';
import type { SlicePermissions } from '@shared/types';
import { thunkGetPermissions } from './thunk';

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
      const contextId = action.payload[context].contextId;

      state[context][contextId] = action.payload[context].permissions;
    });
  },
});

export const {} = permissionsSlice.actions;
export const permissionsReducer = permissionsSlice.reducer;
