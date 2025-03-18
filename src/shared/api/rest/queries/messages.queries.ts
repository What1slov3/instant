import { API_ROUTES } from '@shared/api/rest/routes';
import { APIInterface } from '@shared/api/rest';
import type { Message, MessageContent } from '@shared/types';

export const messagesQueries = {
  // TODO getHistory -> chat, мы же не хотим получить историю сообщений, мы хотим историю чата
  getHistory: (chatId: string, offset: number, limit: number) => {
    return APIInterface.get<{ history: Message[]; hasMore: boolean; chatId: string }>(API_ROUTES.MESSAGES.GET_HISTORY, {
      params: { chatId, offset, limit },
    });
  },
  send: (content: MessageContent, chatId: string) => {
    return APIInterface.post<Message>(API_ROUTES.MESSAGES.SEND_MESSAGE, { content, chatId });
  },
  delete: (_id: string, chatId: string) => {
    return APIInterface.delete<Message>(API_ROUTES.MESSAGES.DELETE_MESSAGE, {
      data: { _id, chatId },
    });
  },
  edit: (_id: string, content: MessageContent) => {
    return APIInterface.put<Message>(API_ROUTES.MESSAGES.EDIT_MESSAGE, {
      _id,
      content,
    });
  },
};
