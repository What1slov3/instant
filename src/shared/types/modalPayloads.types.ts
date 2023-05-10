import { Chat, ChatGroup, ID, Message } from '@shared/types';

export type DeleteMessageModalPayload = {
  message: Message;
};
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
export type ChatMembersListPayload = {
  chatId: ID;
};
