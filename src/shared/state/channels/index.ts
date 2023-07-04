import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  thunkCreateChannel,
  thunkGetChannels,
  thunkInitChats,
  thunkJoinChannelByInvite,
  thunkLeaveChannel,
  thunkUpdateChannel,
} from './thunk';
import { thunkCreateChat } from '..';
import type { SliceChannels, ID } from '@shared/types';

const initialState: SliceChannels = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    kickChannelUser: (state, action: PayloadAction<{ channelId: ID; userId: ID }>) => {
      const channel = state.channels.find((channel) => channel.id === action.payload.channelId)!;
      channel.members = channel.members.filter((userId) => userId !== action.payload.userId);
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkCreateChannel.fulfilled, (state, action) => {
      state.channels.push(action.payload);
    });
    builder.addCase(thunkGetChannels.fulfilled, (state, action) => {
      state.channels = state.channels.concat(action.payload);
    });
    builder.addCase(thunkUpdateChannel.fulfilled, (state, action) => {
      const index = state.channels.findIndex((channel) => channel.id === action.payload.id);
      state.channels[index] = action.payload;
    });
    builder.addCase(thunkCreateChat.fulfilled, (state, action) => {
      const index = state.channels.findIndex((channel) =>
        channel.chatGroups!.find((chatGroup) => chatGroup.id === action.payload.chatGroupId)
      );
      const chatGroupIndex = state.channels[index].chatGroups!.findIndex(
        (chatGroup) => chatGroup.id === action.meta.arg.chatGroupId
      );
      state.channels[index].chatGroups![chatGroupIndex].chats.push(action.payload.id);
    });
    builder.addCase(thunkInitChats.fulfilled, (state, action) => {
      const channelIndex = state.channels.findIndex((channel) => channel.id === action.meta.arg);
      state.channels[channelIndex].chatGroups = action.payload;
    });
    builder.addCase(thunkJoinChannelByInvite.fulfilled, (state, action) => {
      state.channels.push(action.payload);
    });
    builder.addCase(thunkLeaveChannel.fulfilled, (state, action) => {
      const channelIndex = state.channels.findIndex((channel) => channel.id === action.meta.arg);
      state.channels.splice(channelIndex, 1);
    });
  },
});

export const { kickChannelUser } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
