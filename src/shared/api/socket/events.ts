export const SOCKET_EVENTS = Object.freeze({
  MESSAGE: {
    RECIEVED: 'userMessage/received',
    DELETED: 'userMessage/deleted',
  },
  CONNECT: 'user/connect',
  CHANNELS: {
    JOIN: 'channels/join',
  },
  CHATS: {
    JOIN: 'chats/join',
  },
} as const);
