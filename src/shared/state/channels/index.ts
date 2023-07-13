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
import type { SliceChannels, ID, Channel } from '@shared/types';

const initialState: SliceChannels = {};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    kickChannelUser: (state, action: PayloadAction<{ channelId: ID; userId: ID }>) => {
      const channel = state[action.payload.channelId];
      channel.members = channel.members = channel.members.filter((userId) => userId !== action.payload.userId);
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkGetChannels.fulfilled, (state, action) => {
      return action.payload.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {} as Record<ID, Channel>);
    });
    builder.addCase(thunkCreateChannel.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });
    builder.addCase(thunkUpdateChannel.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });
    builder.addCase(thunkCreateChat.fulfilled, (state, action) => {
      const channel = state[action.meta.arg.owningChannelId];
      const chatGroupIndex = channel.chatGroups!.findIndex((chatGroup) => chatGroup.id === action.meta.arg.chatGroupId);
      channel.chatGroups![chatGroupIndex].chats.push(action.payload.id);
    });
    builder.addCase(thunkInitChats.fulfilled, (state, action) => {
      state[action.meta.arg].chatGroups = action.payload;
    });
    builder.addCase(thunkJoinChannelByInvite.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });
    builder.addCase(thunkLeaveChannel.fulfilled, (state, action) => {
      const copy = { ...state };
      delete copy[action.meta.arg];
      return copy;
    });
  },
});

export const { kickChannelUser } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
