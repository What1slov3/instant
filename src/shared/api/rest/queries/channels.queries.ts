import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';
import type { Channel, ID } from '@shared/types';

export const channelsQueries = {
  create: (name: string, icon: File) => {
    return APIAccessor.post<Channel>(
      API_ROUTES.CHANNELS.CREATE,
      { name, icon },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },
  get: (channelIds: ID | ID[], withMembers = true) => {
    return APIAccessor.get<Channel[]>(API_ROUTES.CHANNELS.GET, {
      params: { ids: typeof channelIds === 'string' ? channelIds : channelIds.join(','), withMembers },
    });
  },
  updateChannel: (channelId: ID, data: Partial<Omit<Channel, 'banner' | 'icon'> & { icon?: File; banner?: File }>) => {
    const { members, ...rest } = data;

    return APIAccessor.patch<Channel>(`${API_ROUTES.CHANNELS.UPDATE_CHANNEL}/${channelId}`, rest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  leaveChannel: (channelId: string) => {
    return APIAccessor.get(`${API_ROUTES.CHANNELS.LEAVE}`, { params: { channelId } });
  },
};
