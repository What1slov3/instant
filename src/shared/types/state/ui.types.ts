import type {
  Message,
  ID,
  CreateChannelModalPayload,
  DeleteMessageModalPayload,
  ChannelSettingsModalPayload,
  ChannelInviteModalPayload,
  CreateChatModalPayload,
  ImageAttachmentPayload,
} from '@shared/types';

export type UIState = {
  modal: Modal;
};

export type Modal =
  | { name: null; payload: null }
  | {
      name: 'createChannel';
      payload?: CreateChannelModalPayload;
    }
  | {
      name: 'deleteMessage';
      payload: DeleteMessageModalPayload;
    }
  | {
      name: 'channelSettings';
      payload?: ChannelSettingsModalPayload;
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
    };

export type ModalsWihtoutPayload = 'createChannel' | 'channelSettings' | 'changePassword';
export type ModalName = ModalsWihtoutPayload | 'deleteMessage' | 'channelInvite' | 'createChat' | 'imageAttachment';
