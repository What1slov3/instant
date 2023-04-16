import { Chat, ID } from '@customTypes/index';

export type MessagesState = Record<Chat['_id'], Message[]>;

export type Message = {
  _id: ID;
  content: MessageContent;
  context: MessageContext;
  updatedAt: string;
  createdAt: string;
  senderId: ID;
};

export type MessageContent = {
  text: string;
};

export type MessageContext = {
  chatId: ID;
  channelId: ID;
};

export type MessageAction = 'delete' | 'edit';
