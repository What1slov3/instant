import { ID } from '@shared/types';

export interface SliceUserCache extends Record<ID, CachedUser & { timestamp: number }> {}

export type CachedUser = {
  id: ID;
  username: string;
  avatar: string;
  tag: string;
};
