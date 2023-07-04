import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetHistory, thunkGetMe } from '..';
import { stateStyledLogger } from '@shared/libs';
import type { Connection, ChatLoadingStatus, FullyLoadedResources, SliceStatuses } from '@shared/types';

const initialState: SliceStatuses = {
  initated: false,
  connection: {
    channelId: '',
    chatId: '',
    ws: '',
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

export const { setConnection, setFullyLoadedResources, setChatLoadingStatus } = statusesSlice.actions;
export const statusesReducer = statusesSlice.reducer;
