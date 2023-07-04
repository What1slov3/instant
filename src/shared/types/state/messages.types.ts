import { Chat, ID } from '@shared/types';

export interface SliceMessages extends Record<Chat['id'], Message[]> {};

export type Message = {
  id: ID;
  content: MessageContent;
  chatId: string;
  updatedAt: string;
  createdAt: string;
  senderId: ID;
  meta?: MessageMeta;
};

export type MessageAttachments = {
  files?: string[];
};

export type MessageContent = {
  text: string;
  attachments?: MessageAttachments;
};

export type MessageType = 'greetings' | never;

export type MessageMeta = {
  type: 'greetings';
  data: {
    userId: ID;
  };
} | null;

export type MessageAction = 'delete' | 'edit' | 'copy';
