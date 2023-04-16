import CreateChannelModal from '@containers/Modals/CreateChannel/CreateChannelModal';
import DeleteMessageModal from '@containers/Modals/DeleteMessage/DeleteMessageModal';
import ChannelSettingsModal from '@containers/Modals/ChannelSettings/ChannelSettingsModal';
import ChannelInviteModal from '@containers/Modals/ChannelInvite/ChannelInviteModal';
import CreateChatModal from '@containers/Modals/CreateChat/CreateChatModal';
import ChangePasswordModal from '@containers/Modals/ChangePassword/ChangePassword';
import type { ModalName } from '@customTypes/index';

export const MODALS: Record<NonNullable<ModalName>, React.FC<any>> = {
  createChannel: CreateChannelModal,
  deleteMessage: DeleteMessageModal,
  channelSettings: ChannelSettingsModal,
  channelInvite: ChannelInviteModal,
  createChat: CreateChatModal,
  changePassword: ChangePasswordModal,
};
