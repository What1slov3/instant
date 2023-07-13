import { kickChannelUser, store } from '@shared/state';
import { ID } from '@shared/types';

const dispatch = store.dispatch;

export const effects = {
  kickUser(channelId: ID, userId: ID) {
    dispatch(kickChannelUser({ channelId, userId }));
  },
};
