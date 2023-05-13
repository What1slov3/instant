import { ID } from '@shared/types';

export type ChatsState = Record<string, Chat>;

export type Chat = {
  _id: ID;
  owningChannelId: ID;
  name: string;
  createdAt: string;
  updatedAt: string;
};
