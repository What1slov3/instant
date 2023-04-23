import { memo } from 'react';
import classNames from 'classnames';
import Tooltip from '@components/Tooltip/Tooltip';
import { wrapAllFormatting } from '@common/libs';
import { LSAInstance } from '../../..';
import MessageAttachment from '@components/Attachments/MessageAttachment/MessageAttachment';
import type { Message } from '@customTypes/index';
import s from './chatmessage.module.css';

type Props = {
  updatedAt: string;
  createdAt: string;
  fullTime: string;
  isShort?: boolean;
  username: string;
  userIsOwner: boolean;
} & Omit<Message, 'updatedAt' | 'createdAt'>;

const ChatMessage: React.FC<Props> = ({
  _id,
  content,
  createdAt,
  fullTime,
  isShort,
  username,
  userIsOwner,
}): JSX.Element => {
  return (
    <div className={classNames(s.message, { [s.short]: isShort })} data-message="true" data-message-id={_id}>
      <Tooltip text={fullTime} className={s.timestampWrapper}>
        <div className={s.timestamp}>{createdAt}</div>
      </Tooltip>
      <div className={s.inner}>
        {!isShort && <div className={s.ownerName}>{username}</div>}
        <div className={s.content} style={{ fontSize: LSAInstance.getSetting('messageTextSize') }}>
          {wrapAllFormatting(content.text)}
        </div>
        {content.attachments && <MessageAttachment attachments={content.attachments} />}
      </div>
      <div className={s.contextMenu}>
        {userIsOwner && (
          <i className={classNames('fa-solid fa-trash-can', s.deleteMessage)} data-message-action="delete"></i>
        )}
      </div>
    </div>
  );
};

export default memo(ChatMessage);
