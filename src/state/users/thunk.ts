import { APIQueries } from '@api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ID } from '@customTypes/index';

export const thunkGetUsers = createAsyncThunk(
  'user/getUsers',
  async ({ ids }: { ids: ID | ID[] }, { rejectWithValue }) => {
    const res = await APIQueries.users.getUsers(ids);
    return res.data;
  }
);
