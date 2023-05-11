import { ID } from '@shared/types';

export type UsersCache = Record<ID, CachedUser & { timestamp: number }>;

export type CachedUser = {
  _id: ID;
  username: string;
  avatar: string;
  tag: string;
};
