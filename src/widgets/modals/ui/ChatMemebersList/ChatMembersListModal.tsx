import classNames from 'classnames';
import { useAppSelector } from '@shared/state';
import { ModalHeader } from '@shared/ui';
import { TEXTS } from '@shared/config';
import { ViewChatMembers } from '@features/chat/view-chat-members';
import type { ChatMembersListPayload } from '@shared/types';
import s from './chatmemberslistmodal.module.css';

export const ChatMembersListModal: React.FC<ChatMembersListPayload> = ({ chatId }): JSX.Element => {
  const chatName = useAppSelector((state) => state.chats[chatId].name);

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>
        {TEXTS.MODALS.HEADERS.CHAT_MEMBERS_LIST}
        <span className={s.chatName}>
          <span> #</span>
          {chatName}
        </span>
      </ModalHeader>
      <ViewChatMembers chatId={chatId} />
    </div>
  );
};
