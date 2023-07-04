import { config } from '@shared/config';
import { store, thunkGetHistory } from '@shared/state';
import type { ID } from '@shared/types';

const dispatch = store.dispatch;

export const effects = {
  getHistory(chatId: ID, offset: number, limit = config.GET_HISTORY_LIMIT) {
    if (limit) {
      dispatch(
        thunkGetHistory({
          offset,
          limit,
          chatId,
        })
      );
    }
  },
};
