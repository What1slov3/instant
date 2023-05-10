import type {
  DeleteMessageModalPayload,
  ChannelInviteModalPayload,
  CreateChatModalPayload,
  ImageAttachmentPayload,
  ChatMembersListPayload,
} from '@shared/types';

export type UIState = {
  modal: Modal;
};

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
  | { name: 'chatMembersList'; payload: ChatMembersListPayload };

export type ModalsWihtoutPayload = 'createChannel' | 'channelSettings' | 'changePassword';
export type ModalName =
  | ModalsWihtoutPayload
  | 'deleteMessage'
  | 'channelInvite'
  | 'createChat'
  | 'imageAttachment'
  | 'chatMembersList';
