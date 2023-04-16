import { API_ROUTES } from '@api/routes';
import { APIAccessor } from '@api/index';
import type { Channel, ID } from '@customTypes/index';

export const channelsQueries = {
  create: (name: string, icon: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);

    return APIAccessor.post<Channel>(API_ROUTES.CHANNELS.CREATE, formData);
  },
  get: (channelIds: ID | ID[]) => {
    return APIAccessor.get<Channel[]>(API_ROUTES.CHANNELS.GET, {
      params: { ids: typeof channelIds === 'string' ? channelIds : channelIds.join(',') },
    });
  },
  updateChannel: (channelId: ID, data: Partial<Omit<Channel, 'banner' | 'icon'> & { icon?: File; banner?: File }>) => {
    const formData = new FormData();

    const { members, chatGroups, ...rest } = data;

    Object.keys(data).forEach((key) => {
      formData.append(key, rest[key as keyof Omit<Channel, 'members' | 'chatGroups'>]!);
    });

    return APIAccessor.patch<Channel>(`${API_ROUTES.CHANNELS.UPDATE_CHANNEL}/${channelId}`, data);
  },
};
