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
  get: (channelIds: ID | ID[]) => {
    return APIAccessor.get<Channel[]>(API_ROUTES.CHANNELS.GET, {
      params: { ids: typeof channelIds === 'string' ? channelIds : channelIds.join(',') },
    });
  },
  updateChannel: (channelId: ID, data: Partial<Omit<Channel, 'banner' | 'icon'> & { icon?: File; banner?: File }>) => {
    const { members, chatGroups, ...rest } = data;

    return APIAccessor.patch<Channel>(`${API_ROUTES.CHANNELS.UPDATE_CHANNEL}/${channelId}`, rest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
