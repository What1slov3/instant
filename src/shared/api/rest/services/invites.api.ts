import { API_ROUTES } from '@shared/api/rest/routes';
import { commonAPI } from './common.api';
import type { Channel, ID } from '@shared/types';

export const invitesAPI = commonAPI.injectEndpoints({
  endpoints: (build) => ({
    getChannelInvite: build.query<{ _id: string; channelId: ID; link: string }, any>({
      query: (channelId: ID) => `${API_ROUTES.INVITES.GET_CHANNEL_INVITE}/${channelId}`,
    }),
    getChannelFromInvite: build.query<
      Pick<Channel, 'id' | 'icon' | 'name' | 'banner'> & { membersCount: number; canJoin: boolean },
      any
    >({
      query: (inviteId: string) => `${API_ROUTES.INVITES.GET_CHANNEL_FROM_INVITE}/${inviteId}`,
    }),
  }),
});
