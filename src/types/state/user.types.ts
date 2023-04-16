import type { ID } from '@customTypes/index';

export type UserState = User & {};

export type User = {
  _id: ID;
  username: string;
  avatar: string;
  tag: string;
  email: string;
  channels: ID[];
  createdAt: string | number;
};

export type TUserActivityStatus = 'offline' | 'online' | 'AFK' | 'busy' | 'invisible';
