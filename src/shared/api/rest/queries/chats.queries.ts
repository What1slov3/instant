import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';
import type { Chat, ID } from '@shared/types';

export const chatsQueries = {
  getChats: (ids: string[]) => {
    return APIAccessor.get<Chat[]>(API_ROUTES.CHATS.GET, { params: { ids: ids.join(',') } });
  },
  createChat: (name: string, chatGroupId: ID, owningChannelId: ID) => {
    return APIAccessor.post<Chat>(API_ROUTES.CHATS.CREATE, { name, chatGroupId, owningChannelId });
  },
  updateChat: (chatId: ID, data: Partial<Chat>) => {
    return APIAccessor.patch<Chat>(`${API_ROUTES.CHATS.UPDATE}/${chatId}`, { ...data });
  },
};
