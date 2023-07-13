import { memo } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { UserMessage } from '../UserMessage/UserMessage';
import { SystemMessage } from '../SystemMessage/SystemMessage';
import { MessageToolbar } from '../MessageToolbar/MessageToolbar';
import type { Message as TMessage } from '@shared/types';
import s from './message.module.css';

type Props = {
  updatedAt: string;
  createdAt: string;
  fullTime: string;
  isShort?: boolean;
  username: string;
} & Omit<TMessage, 'updatedAt' | 'createdAt'>;

const Message: React.FC<Props> = ({
  id,
  createdAt,
  fullTime,
  isShort,
  content,
  username,
  meta,
  senderId,
}): JSX.Element => {
  return (
    <div
      className={classNames(s.message, { [s.short]: isShort })}
      data-message="true"
      data-message-id={id}
      data-message-text={content.text}
      data-sender-id={senderId}
    >
      <Tooltip text={fullTime} className={s.timestampWrapper}>
        <div className={s.timestamp}>{createdAt}</div>
      </Tooltip>
      <div className={s.inner}>
        {meta?.type ? (
          <SystemMessage content={content} username={username} />
        ) : (
          <UserMessage content={content} username={username} />
        )}
      </div>
      <MessageToolbar senderId={senderId} ownerClass={s.contextMenu} />
    </div>
  );
};

export const MessageMemo = memo(Message);
