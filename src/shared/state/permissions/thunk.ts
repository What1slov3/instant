import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIQueries } from '@shared/api/rest';
import type { ConnectionContext, ID } from '@shared/types';

export const thunkGetPermissions = createAsyncThunk(
  'permissions/get',
  async ({ context, contextId }: { context: ConnectionContext; contextId: ID }) => {
    const res = await APIQueries.permissions.get(context, contextId);
    return res.data;
  }
);
