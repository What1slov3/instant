import { ID } from "@customTypes/index";

export type ChannelsState = {
  channels: Channel[];
};

export type Channel = {
  _id: ID;
  chatGroups: ChatGroup<string>[];
  icon: string;
  name: string;
  members: ID[];
  ownerId: ID;
  systemChatId: ID;
  createdAt: string;
  updatedAt: string;
  banner: string;
};

export type ChatGroup<T> = {
  _id: ID;
  name: string;
  chats: T[];
};
