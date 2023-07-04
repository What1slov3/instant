import { ID } from '@shared/types';

export interface SliceChats extends Record<string, Chat> {};

export type Chat = {
  id: ID;
  name: string;
  chatGroupId: ID;
  createdAt: string;
};

export type ChatGroup<T extends string | Chat> = {
  id: ID;
  name: string;
  owningChannelId: ID;
  chats: T[];
};
