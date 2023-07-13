import { setConnection, resetConnection, store } from '@shared/state';
import { Connection } from '@shared/types';

const dispatch = store.dispatch;

export const effects = {
  setConnection(data: Partial<Connection>) {
    dispatch(setConnection(data));
  },
  resetConnection() {
    dispatch(resetConnection);
  },
};
