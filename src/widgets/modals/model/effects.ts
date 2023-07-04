import { store, thunkLeaveChannel } from '@shared/state';
import type { ID } from '@shared/types';

const dispatch = store.dispatch;

export const effects = {
  leaveChannel: (channelId: ID) => {
    dispatch(thunkLeaveChannel(channelId));
  },
};
