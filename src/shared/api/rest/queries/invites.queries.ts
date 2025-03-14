import { API_ROUTES } from '@shared/api/rest/routes';
import { APIInterface } from '@shared/api/rest';
import type { Channel } from '@shared/types';

export const invitesQueries = {
  joinChannelByInvite: (inviteId: string) => {
    return APIInterface.get<Channel>(`${API_ROUTES.INVITES.JOIN_CHANNEL_BY_INVITE}/${inviteId}`);
  },
};