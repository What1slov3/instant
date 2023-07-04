import { ChatGroup, ID } from '@shared/types';

export type SliceChannels = {
  channels: Channel[];
};

export type Channel = {
  id: ID;
  chatGroups?: ChatGroup<ID>[];
  icon: string;
  name: string;
  members: ID[];
  ownerId: ID;
  systemChatId: ID;
  createdAt: string;
  banner: string;
};
