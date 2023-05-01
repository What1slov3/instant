import { APIQueries } from '@shared/api/rest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@shared/types';

export const thunkGetMe = createAsyncThunk('user/getMe', async () => {
  const res = await APIQueries.user.getMe();
  return res.data;
});

export const thunkUpdateUser = createAsyncThunk('user/update', async (data: Partial<User>) => {
  const res = await APIQueries.user.update(data);
  return res.data;
});
