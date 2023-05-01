import { APIQueries } from '@shared/api/rest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ID } from '@shared/types';

export const thunkGetUsers = createAsyncThunk(
  'user/getUsers',
  async ({ ids }: { ids: ID | ID[] }, { rejectWithValue }) => {
    const res = await APIQueries.users.getUsers(ids);
    return res.data;
  }
);
