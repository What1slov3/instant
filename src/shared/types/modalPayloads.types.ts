import { Chat, ChatGroup, ID, Message } from '@shared/types';

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
