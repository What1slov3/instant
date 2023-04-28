import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { statusesReducer, channelsReducer, chatsReducer, messagesReducer, uiReducer, userReducer } from './index';
import { commonAPI } from '@api/services';
import { userIntegrityCacheListener } from './middlewares/userIntegrity';
import type { TypedUseSelectorHook } from 'react-redux';
import { usersReducer } from './users';

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  statuses: statusesReducer,
  channels: channelsReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  usersCache: usersReducer,
  [commonAPI.reducerPath]: commonAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([thunk, commonAPI.middleware, userIntegrityCacheListener.middleware]);
  },
});

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
export type GlobalState = ReturnType<typeof rootReducer>;
