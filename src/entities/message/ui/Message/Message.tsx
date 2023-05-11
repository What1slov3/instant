import { memo } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { UserMessage } from '../UserMessage/UserMessage';
import { SystemMessage } from '../SystemMessage/SystemMessage';
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
  createdAt,
  fullTime,
  isShort,
  userIsOwner,
  content,
  username,
  meta,
}): JSX.Element => {
  return (
    <div className={classNames(s.message, { [s.short]: isShort })} data-message="true" data-message-id={_id}>
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
      <div className={s.contextMenu}>
        {userIsOwner && (
          <i className={classNames('fa-solid fa-trash-can', s.deleteMessage)} data-message-action="delete"></i>
        )}
      </div>
    </div>
  );
};

export const MessageMemo = memo(Message);
