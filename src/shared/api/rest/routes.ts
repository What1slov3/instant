export const API_BASE = process.env.REACT_APP_API_URL;

//  TODO add methods into this schema
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
    LEAVE: '/channels/leave',
  },
  CHATS: {
    GET: '/chats',
    CREATE: '/chats/create',
    UPDATE: '/chats',
    INIT: '/chats/forChannel',
  },
  MESSAGES: {
    GET_HISTORY: '/messages/history',
    SEND_MESSAGE: '/messages/send',
    DELETE_MESSAGE: '/messages',
  },
  INVITES: {
    GET_CHANNEL_INVITE: '/invites/channel',
    GET_CHANNEL_FROM_INVITE: '/invites',
    JOIN_CHANNEL_BY_INVITE: '/invites/join',
  },
  FILES: {
    UPLOAD: '/files/upload',
  },
  PERMISSIONS: {
    GET: '/permissions',
  },
};
