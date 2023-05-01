import { ID } from '@shared/types';

export type ChatsState = Record<string, Chat>;

export type Chat = {
  _id: ID;
  owningChannelId: ID;
  name: string;
  stats: {
    messageCount: number;
  };
  createdAt: string;
  updatedAt: string;
};
