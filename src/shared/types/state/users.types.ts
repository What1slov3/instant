import { ID } from '@shared/types';

export type CachedUsers = Record<ID, CachedUser>;

export type CachedUser = {
  _id: ID;
  username: string;
  avatar: string;
  tag: string;
};
