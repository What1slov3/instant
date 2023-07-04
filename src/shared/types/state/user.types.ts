import type { ID, LoadingStatus } from '@shared/types';

export interface SliceUser extends User, LoadingStatus {};

export type User = {
  id: ID;
  username: string;
  avatar: string;
  tag: string;
  email: string;
  channels: ID[];
  createdAt: string | number;
};
