import type { Chat, Message, Modal } from '@shared/types';

export interface SliceUI {
  modal: Modal;
  messages: {
    editing: Record<Chat['id'], Message>;
  };
}
