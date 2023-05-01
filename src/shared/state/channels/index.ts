import { createSlice } from '@reduxjs/toolkit';
import { thunkCreateChannel, thunkGetChannels, thunkUpdateChannel } from './thunk';
import { thunkCreateChat } from '..';
import type { ChannelsState } from '@shared/types';

const initialState: ChannelsState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(thunkCreateChannel.fulfilled, (state, action) => {
      state.channels.push(action.payload);
    });
    builder.addCase(thunkGetChannels.fulfilled, (state, action) => {
      state.channels = state.channels.concat(action.payload);
    });
    builder.addCase(thunkUpdateChannel.fulfilled, (state, action) => {
      const index = state.channels.findIndex((channel) => channel._id === action.payload._id);
      state.channels[index] = action.payload;
    });
    builder.addCase(thunkCreateChat.fulfilled, (state, action) => {
      const index = state.channels.findIndex((channel) => channel._id === action.payload.owningChannelId);
      const chatGroupIndex = state.channels[index].chatGroups.findIndex(
        (chatGroup) => chatGroup._id === action.meta.arg.chatGroupId
      );
      state.channels[index].chatGroups[chatGroupIndex].chats.push(action.payload._id);
    });
  },
});

export const {} = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
