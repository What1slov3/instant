import { API_ROUTES } from '@shared/api/rest/routes';
import { commonAPI } from '@shared/state';
import type { Channel, ID } from '@shared/types';

export const invitesAPI = commonAPI.injectEndpoints({
  endpoints: (build) => ({
    getChannelInvite: build.query<{ _id: string; channelId: ID; link: string }, any>({
      query: (channelId: ID) => `${API_ROUTES.INVITES.GET_CHANNEL_INVITE}/${channelId}`,
    }),
    getChannelFromInvite: build.query<
      Pick<Channel, '_id' | 'icon' | 'name' | 'banner'> & { membersCount: number },
      any
    >({
      query: (inviteId: string) => `${API_ROUTES.INVITES.GET_CHANNEL_FROM_INVITE}/${inviteId}`,
    }),
  }),
});
