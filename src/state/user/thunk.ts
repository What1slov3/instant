import { APIQueries } from '@api/index';
import { User } from '@customTypes/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkGetMe = createAsyncThunk('user/getMe', async () => {
  const res = await APIQueries.user.getMe();
  return res.data;
});

export const thunkUpdateUser = createAsyncThunk('user/update', async (data: Partial<User>) => {
  const res = await APIQueries.user.update(data);
  return res.data;
});
