import { APIQueries } from '@shared/api/rest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MessageContent, ID } from '@shared/types';

export const thunkGetHistory = createAsyncThunk(
  'messages/getHistory',
  async ({ chatId, offset, limit }: { chatId: ID; offset: number; limit: number }) => {
    const res = await APIQueries.messages.getHistory(chatId, offset, limit);
    return res.data;
  }
);

export const thunkSendMessage = createAsyncThunk(
  'messages/send',
  async ({ content, chatId }: { content: MessageContent; chatId: string }) => {
    const res = await APIQueries.messages.send(content, chatId);
    return res.data;
  }
);

export const thunkDeleteMessage = createAsyncThunk(
  'messages/delete',
  async ({ _id, chatId }: { _id: ID; chatId: string }) => {
    const res = await APIQueries.messages.delete(_id, chatId);
    return res.data;
  }
);
