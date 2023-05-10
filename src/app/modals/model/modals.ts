import type { ModalName } from '@shared/types';
import {
  ChangePasswordModal,
  ChannelInviteModal,
  ChannelSettingsModal,
  ChatMembersListModal,
  CreateChannelModal,
  CreateChatModal,
  DeleteMessageModal,
  ImageAttachmentModal,
} from '@widgets/modals';

export const MODALS: Record<NonNullable<ModalName>, React.FC<any>> = {
  createChannel: CreateChannelModal,
  deleteMessage: DeleteMessageModal,
  channelSettings: ChannelSettingsModal,
  channelInvite: ChannelInviteModal,
  createChat: CreateChatModal,
  changePassword: ChangePasswordModal,
  imageAttachment: ImageAttachmentModal,
  chatMembersList: ChatMembersListModal,
};
