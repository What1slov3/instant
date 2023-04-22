import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { thunkGetHistory, thunkSendMessage, thunkGetUsers } from '@state/index';
import type { GlobalState } from '@state/index';
import type { Message } from '@customTypes/index';

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
      });
    }

    if (action.type === 'messages/send/fulfilled') {
      const payload = action.payload as Message;
      if (!state.usersCache[payload.senderId]) {
        nonCachedUsersSet.add(payload.senderId);
      }
    }
    
    if (nonCachedUsersSet.size > 0) {
      listenerApi.dispatch(thunkGetUsers({ ids: [...nonCachedUsersSet.values()] }));
    }
  },
});
