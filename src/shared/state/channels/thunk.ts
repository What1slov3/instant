import { APIQueries } from '@shared/api/rest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Channel, ID } from '@shared/types';

export const thunkCreateChannel = createAsyncThunk(
  'channels/create',
  async ({ name, icon }: { name: string; icon: File }) => {
    const res = await APIQueries.channels.create(name, icon);
    return res.data;
  }
);

export const thunkGetChannels = createAsyncThunk('channels/get', async ({ ids }: { ids: ID[] }) => {
  const res = await APIQueries.channels.get(ids);
  return res.data;
});

export const thunkUpdateChannel = createAsyncThunk(
  'channels/updateChannel',
  async ({
    channelId,
    data,
  }: {
    channelId: ID;
    data: Partial<Omit<Channel, 'banner' | 'icon'> & { icon?: File; banner?: File }>;
  }) => {
    const res = await APIQueries.channels.updateChannel(channelId, data);
    return res.data;
  }
);

export const thunkJoinChannelByInvite = createAsyncThunk('channels/join', async (inviteId: string) => {
  const res = await APIQueries.invites.joinChannelByInvite(inviteId);
  return res.data;
});
