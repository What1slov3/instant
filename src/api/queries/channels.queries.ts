import { API_ROUTES } from '@api/routes';
import { APIAccessor } from '@api/index';
import type { Channel, ID } from '@customTypes/index';

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
