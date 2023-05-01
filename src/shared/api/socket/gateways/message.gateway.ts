import { Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '../events';
import { store, addMessage, deletedMessage } from '@shared/state';
import type { RecievedMessage, DeletedMessage } from '@shared/types';

export function messageGateway(socket: Socket) {
  socket.on(SOCKET_EVENTS.MESSAGE.RECIEVED, (message: RecievedMessage) => {
    if (store.getState().user._id !== message.senderId) {
      store.dispatch(addMessage(message));
    }
  });
  socket.on(SOCKET_EVENTS.MESSAGE.DELETED, (message: DeletedMessage) => {
    if (store.getState().user._id !== message.senderId) {
      store.dispatch(deletedMessage(message));
    }
  });
}
