import { messageGateway } from './gateways/message.gateway';
import { Socket, io } from 'socket.io-client';
import { store, setConnection } from '@shared/state';
import { socketStyledLogger } from '@shared/libs';

export class MainWebSocketGateway {
  private _socket: Socket;

  constructor() {
    this._socket = io(process.env.REACT_APP_WEBSOCKET_URL, { transports: ['websocket'] });

    this._socket.on('connect', () => {
      socketStyledLogger(`Connected with ID: ${this._socket.id}`);
      store.dispatch(setConnection({ wsId: this._socket.id }));
    });
  }

  get socket() {
    return this._socket;
  }
}

export const SocketInstance = new MainWebSocketGateway().socket;

messageGateway(SocketInstance);
