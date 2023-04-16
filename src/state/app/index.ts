import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetHistory, thunkGetMe } from '..';
import { stateStyledLogger } from '@common/libs';
import type { Connection, ChatLoadingStatus, FullyLoadedResources, AppState } from '@customTypes/index';

const initialState: AppState = {
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

const appSlice = createSlice({
  name: 'app',
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
    builder.addCase(thunkGetMe.fulfilled, (state, action) => {
      state.initated = true;
    });
    builder.addCase(thunkGetHistory.pending, (state, action) => {
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
    builder.addCase(thunkGetHistory.rejected, (state, action) => {
      state.chatLoadingStatus = {
        hasMore: false,
        loading: false,
        isLoaded: false,
      };
    });
  },
});

export const { setConnection, setFullyLoadedResources, setChatLoadingStatus } = appSlice.actions;
export const appReducer = appSlice.reducer;
