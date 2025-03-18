import { store, thunkEditMessage, thunkSendMessage, unmarkMessageAsEditing } from '@shared/state';
import type { Chat, Connection, Message, MessageAttachments } from '@shared/types';

const dispatch = store.dispatch;

export const effects = {
  sendMessage: (connection: Connection, text: string, attachments: MessageAttachments) => {
    dispatch(
      thunkSendMessage({
        content: {
          text,
          attachments,
        },
        chatId: connection.chatId!,
      })
    );
  },
  editMessage: (messageId: Message['id'], text: string, attachments: MessageAttachments) => {
    dispatch(
      thunkEditMessage({
        content: {
          text,
          attachments,
        },
        _id: messageId,
      })
    );
  },
  unmarkEditMessage: (chatId: Chat['id'], messageId: Message['id']) => {
    dispatch(unmarkMessageAsEditing({ chatId, messageId }));
  },
};
