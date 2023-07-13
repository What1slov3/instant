import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetHistory, thunkGetMe } from '..';
import { stateStyledLogger } from '@shared/libs';
import type { Connection, ChatLoadingStatus, FullyLoadedResources, SliceStatuses } from '@shared/types';

const initialState: SliceStatuses = {
  initated: false,
  connection: {
    channelId: null,
    chatId: null,
    wsId: null,
    channel: null,
    chat: null,
  },
  fullyLoadedResources: {
    channelIds: [],
    chatIds: [],
  },
  chatLoadingStatus: {
    hasMore: false,
    loading: false,
    isLoaded: false,
  },
};

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<Partial<Connection>>) => {
      state.connection = { ...state.connection, ...action.payload };
      stateStyledLogger('Connection updated', state.connection);
    },
    resetConnection: (state) => {
      state.connection = { ...state.connection, channel: null, channelId: null, chat: null, chatId: null };
    },
    setFullyLoadedResources: (state, action) => {
      (Object.keys(action.payload) as (keyof FullyLoadedResources)[]).forEach((resource) => {
        state.fullyLoadedResources[resource] = action.payload[resource]!.concat(state.fullyLoadedResources[resource]);
      });
    },
    setChatLoadingStatus: (state, action: PayloadAction<Partial<ChatLoadingStatus>>) => {
      state.chatLoadingStatus = { ...state.chatLoadingStatus, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkGetMe.fulfilled, (state) => {
      state.initated = true;
    });
    builder.addCase(thunkGetHistory.pending, (state) => {
      state.chatLoadingStatus = {
        hasMore: false,
        loading: true,
        isLoaded: false,
      };
    });
    builder.addCase(thunkGetHistory.fulfilled, (state, action) => {
      if (!action.payload.hasMore) {
        state.fullyLoadedResources.chatIds.push(action.payload.chatId);
      }
      state.chatLoadingStatus = {
        hasMore: action.payload.hasMore,
        loading: false,
        isLoaded: true,
      };
    });
    builder.addCase(thunkGetHistory.rejected, (state) => {
      state.chatLoadingStatus = {
        hasMore: false,
        loading: false,
        isLoaded: false,
      };
    });
  },
});

export const { setConnection, setFullyLoadedResources, setChatLoadingStatus, resetConnection } = statusesSlice.actions;
export const statusesReducer = statusesSlice.reducer;
