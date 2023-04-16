import { API_ROUTES } from '@api/routes';
import { commonAPI } from './common.api';
import type { Channel, ID } from '@customTypes/index';

export const channelsAPI = commonAPI.injectEndpoints({
  endpoints: (build) => ({
    getChannels: build.query<Channel[], any>({
      query: (channelId: ID | ID[]) => {
        if (typeof channelId === 'string') {
          channelId = [channelId];
        }
        return `${API_ROUTES.CHANNELS.GET}?ids=${channelId.join(',')}`;
      },
    }),
  }),
});
