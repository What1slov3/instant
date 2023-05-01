export const API_BASE = process.env.REACT_APP_API_URL;

export const API_ROUTES = {
  AUTH: {
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    GET_USERS: '/user/users',
    GET_ME: '/user/me',
    CHANGE_PASSWORD: '/user/password',
    UPDATE: '/user/update',
  },
  CHANNELS: {
    CREATE: '/channels/create',
    GET: '/channels',
    UPDATE_CHANNEL: '/channels',
  },
  CHATS: {
    GET: '/chats',
    CREATE: '/chats/create',
  },
  MESSAGES: {
    GET_HISTORY: '/messages/history',
    SEND_MESSAGE: '/messages/send',
    DELETE_MESSAGE: '/messages',
  },
  INVITES: {
    GET_CHANNEL_INVITE: '/invites/channel',
    GET_CHANNEL_FROM_INVITE: '/invites',
  },
  FILES: {
    UPLOAD: '/files/upload',
  },
};
