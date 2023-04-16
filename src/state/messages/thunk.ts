import { APIQueries } from '@api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MessageContent, MessageContext, ID } from '@customTypes/index';

export const thunkGetHistory = createAsyncThunk(
  'messages/getHistory',
  async ({ chatId, offset, limit }: { chatId: ID; offset: number; limit: number }) => {
    const res = await APIQueries.messages.getHistory(chatId, offset, limit);
    return res.data;
  }
);

export const thunkSendMessage = createAsyncThunk(
  'messages/send',
  async ({ content, context }: { content: MessageContent; context: MessageContext }) => {
    const res = await APIQueries.messages.send(content, context);
    return res.data;
  }
);

export const thunkDeleteMessage = createAsyncThunk(
  'messages/delete',
  async ({ _id, context }: { _id: ID; context: MessageContext }) => {
    const res = await APIQueries.messages.delete(_id, context);
    return res.data;
  }
);
