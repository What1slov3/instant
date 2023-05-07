import type { ID, LoadingStatus } from '@shared/types';

export type UserState = User & LoadingStatus;

export type User = {
  _id: ID;
  username: string;
  avatar: string;
  tag: string;
  email: string;
  channels: ID[];
  createdAt: string | number;
};
