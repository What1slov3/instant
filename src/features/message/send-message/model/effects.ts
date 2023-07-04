import { store, thunkSendMessage } from '@shared/state';
import type { Connection, MessageAttachments } from '@shared/types';

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
};
