import { API_ROUTES } from '@api/routes';
import { APIAccessor } from '@api/index';
import type { Chat, ID } from '@customTypes/index';

export const chatsQueries = {
  getChats: (ids: string[]) => {
    return APIAccessor.get<Chat[]>(API_ROUTES.CHATS.GET, { params: { ids: ids.join(',') } });
  },
  createChat: (name: string, chatGroupId: ID, owningChannelId: ID) => {
    return APIAccessor.post<Chat>(API_ROUTES.CHATS.CREATE, { name, chatGroupId, owningChannelId });
  },
};
