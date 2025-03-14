import { API_ROUTES } from '@shared/api/rest/routes';
import { APIInterface } from '@shared/api/rest';
import type { Chat, ChatGroup, ID } from '@shared/types';

export const chatsQueries = {
  getChats: (ids: string[]) => {
    return APIInterface.get<Chat[]>(API_ROUTES.CHATS.GET, { params: { ids: ids.join(',') } });
  },
  createChat: (name: string, chatGroupId: ID, owningChannelId: ID) => {
    return APIInterface.post<Chat>(API_ROUTES.CHATS.CREATE, { name, chatGroupId, owningChannelId });
  },
  updateChat: (chatId: ID, data: Partial<Chat>) => {
    return APIInterface.patch<Chat>(`${API_ROUTES.CHATS.UPDATE}/${chatId}`, { ...data });
  },
  init: (channelId: ID) => {
    return APIInterface.get<ChatGroup<ID>[]>(`${API_ROUTES.CHATS.INIT}`, { params: { channelId } });
  },
};
