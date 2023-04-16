import { API_ROUTES } from '@api/routes';
import { APIAccessor } from '@api/index';
import type { Message, MessageContent, MessageContext } from '@customTypes/index';

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
