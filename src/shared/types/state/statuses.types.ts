import { Channel, Chat, ID } from '@shared/types';

export interface SliceStatuses {
  initated: boolean;
  connection: Connection;
  fullyLoadedResources: FullyLoadedResources;
  chatLoadingStatus: ChatLoadingStatus;
}

export type Connection = {
  channelId: ID | null;
  chatId: ID | null;
  wsId: ID | null;
  channel: Channel | null;
  chat: Chat | null;
};

export type FullyLoadedResources = {
  channelIds: ID[];
  chatIds: ID[];
};

export type ChatLoadingStatus = {
  hasMore: boolean;
  loading: boolean;
  isLoaded: boolean;
};
