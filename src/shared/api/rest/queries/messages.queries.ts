import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';
import type { Message, MessageContent, MessageContext } from '@shared/types';

export const messagesQueries = {
  getHistory: (chatId: string, offset: number, limit: number) => {
    return APIAccessor.get<{ history: Message[]; hasMore: boolean; chatId: string }>(API_ROUTES.MESSAGES.GET_HISTORY, {
      params: { chatId, offset, limit },
    });
  },
  send: (content: MessageContent, context: MessageContext) => {
    return APIAccessor.post<Message>(API_ROUTES.MESSAGES.SEND_MESSAGE, { content, context });
  },
  delete: (_id: string, context: MessageContext) => {
    return APIAccessor.delete<Message>(API_ROUTES.MESSAGES.DELETE_MESSAGE, {
      data: { _id, context },
    });
  },
};
