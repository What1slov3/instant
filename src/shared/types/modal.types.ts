import { Chat, ChatGroup, Connection, ID, Message, AllRequried } from '@shared/types';

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
export type ChatMembersListPayload = Connection;
export type ChatSettingsPayload = Connection;

export type ModalsWithoutPayload = 'createChannel' | 'channelSettings' | 'changePassword';
export type ModalName =
  | ModalsWithoutPayload
  | 'deleteMessage'
  | 'channelInvite'
  | 'createChat'
  | 'imageAttachment'
  | 'chatMembersList'
  | 'chatSettings';

export type Modal =
  | { name: null; payload: null }
  | {
      name: 'createChannel';
      payload?: never;
    }
  | {
      name: 'deleteMessage';
      payload: DeleteMessageModalPayload;
    }
  | {
      name: 'channelSettings';
      payload?: never;
    }
  | {
      name: 'channelInvite';
      payload: ChannelInviteModalPayload;
    }
  | {
      name: 'createChat';
      payload: CreateChatModalPayload;
    }
  | {
      name: 'changePassword';
      payload?: never;
    }
  | {
      name: 'imageAttachment';
      payload: ImageAttachmentPayload;
    }
  | { name: 'chatMembersList'; payload: ChatMembersListPayload }
  | { name: 'chatSettings'; payload: ChatSettingsPayload };
