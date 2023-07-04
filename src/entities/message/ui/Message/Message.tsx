import { memo } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { UserMessage } from '../UserMessage/UserMessage';
import { SystemMessage } from '../SystemMessage/SystemMessage';
import { IconButton } from '@shared/ui';
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
  id,
  createdAt,
  fullTime,
  isShort,
  userIsOwner,
  content,
  username,
  meta,
}): JSX.Element => {
  return (
    <div
      className={classNames(s.message, { [s.short]: isShort })}
      data-message="true"
      data-message-id={id}
      data-message-text={content.text}
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
      <div className={s.contextMenu}>
        <Tooltip position="top" positioning="absolute" text="Копировать">
          <IconButton faClass="fa-regular fa-clone" className={s.contextButton} data-message-action="copy" />
        </Tooltip>
        {userIsOwner && (
          <Tooltip position="top" positioning="absolute" text="Удалить">
            <IconButton
              faClass="fa-solid fa-trash-can"
              className={classNames(s.delete, s.contextButton)}
              data-message-action="delete"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export const MessageMemo = memo(Message);
