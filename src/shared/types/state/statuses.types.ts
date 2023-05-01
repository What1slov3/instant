import { ID } from '@shared/types';

export type StatusesState = {
  initated: boolean;
  connection: Connection;
  fullyLoadedResources: FullyLoadedResources;
  chatLoadingStatus: ChatLoadingStatus;
};

export type Connection = {
  channelId: ID | null;
  chatId: ID | null;
  ws: string | null;
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
