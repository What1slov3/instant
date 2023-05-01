import { memo } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { wrapAllFormatting } from '@shared/libs';
import { MessageAttachment } from '../MessageAttachment/MessageAttachment';
import type { Message as TMessage } from '@shared/types';
import s from './message.module.css';

type Props = {
  updatedAt: string;
  createdAt: string;
  fullTime: string;
  isShort?: boolean;
  username: string;
  userIsOwner: boolean;
} & Omit<TMessage, 'updatedAt' | 'createdAt'>;

const Message: React.FC<Props> = ({
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
        <div className={s.content}>{wrapAllFormatting(content.text)}</div>
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

export const MessageMemo = memo(Message);
