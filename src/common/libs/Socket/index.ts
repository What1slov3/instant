import { messageGateway } from './gateways/message.gateway';
import { Socket, io } from 'socket.io-client';
import { store, setConnection } from '@state/index';
import { socketStyledLogger } from '@common/libs';

export class MainWebSocketGateway {
  private _socket: Socket;

  constructor() {
    this._socket = io('ws://localhost:3001', { transports: ['websocket'] });

    this._socket.on('connect', () => {
      socketStyledLogger(`Connected with ID: ${this._socket.id}`);
      store.dispatch(setConnection({ ws: this._socket.id }));
    });
  }

  get socket() {
    return this._socket;
  }
}

export const SocketInstance = new MainWebSocketGateway().socket;

messageGateway(SocketInstance);
