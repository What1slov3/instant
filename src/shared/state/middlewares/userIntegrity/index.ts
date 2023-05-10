import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { thunkGetHistory, thunkSendMessage, thunkGetUsers } from '@shared/state';
import type { GlobalState } from '@shared/state';
import type { Message } from '@shared/types';

export const userIntegrityCacheListener = createListenerMiddleware();

userIntegrityCacheListener.startListening({
  matcher: isAnyOf(thunkSendMessage.fulfilled, thunkGetHistory.fulfilled),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as GlobalState;

    let nonCachedUsersSet = new Set<string>();

    if (action.type === 'messages/getHistory/fulfilled') {
      (action.payload.history as Message[]).forEach((message) => {
        if (!state.usersCache[message.senderId]) {
          nonCachedUsersSet.add(message.senderId);
        }
        if (message.meta?.data.userId && !state.usersCache[message.meta?.data.userId]) {
          nonCachedUsersSet.add(message.meta.data.userId);
        }
      });
    }

    if (action.type === 'messages/send/fulfilled') {
      const payload = action.payload as Message;
      if (!state.usersCache[payload.senderId]) {
        nonCachedUsersSet.add(payload.senderId);
      }
      if (action.payload.meta?.data.userId && !state.usersCache[action.payload.meta?.data.userId]) {
        nonCachedUsersSet.add(action.payload.meta.data.userId);
      }
    }

    if (nonCachedUsersSet.size > 0) {
      listenerApi.dispatch(thunkGetUsers({ ids: [...nonCachedUsersSet.values()] }));
    }
  },
});
