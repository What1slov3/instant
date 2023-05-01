import { APIQueries } from '@shared/api/rest/';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ID } from '@shared/types';

export const thunkGetChats = createAsyncThunk('chats/get', async ({ ids }: { ids: ID[] }) => {
  const res = await APIQueries.chats.getChats(ids);
  return res.data;
});

export const thunkCreateChat = createAsyncThunk(
  'chats/create',
  async ({ name, chatGroupId, owningChannelId }: { name: string; chatGroupId: ID; owningChannelId: ID }) => {
    const res = await APIQueries.chats.createChat(name, chatGroupId, owningChannelId);
    return res.data;
  }
);
