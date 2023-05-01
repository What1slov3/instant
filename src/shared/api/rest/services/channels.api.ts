import { API_ROUTES } from '@shared/api/rest/routes';
import { commonAPI } from '@shared/state';
import type { Channel, ID } from '@shared/types';

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
