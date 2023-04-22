import type { Chat, ChatGroup, ID, Message } from '@customTypes/index';

export type CreateChannelModalPayload = never;
export type DeleteMessageModalPayload = {
  message: Message;
};
export type ChannelSettingsModalPayload = never;
export type ChannelInviteModalPayload = {
  channelId: ID;
};
export type CreateChatModalPayload = {
  chatGroup: Omit<ChatGroup<Chat>, 'chats'>;
  channelId: ID;
};
export type ImageAttachmentPayload = {
  url: string;
};
