import { MessageAttachment } from '../MessageAttachment/MessageAttachment';
import { MessageContent } from '../MessageContent/MessageContent';
import type { Message } from '@shared/types';
import s from './usermessage.module.css';

type Props = {
  isShort?: boolean;
  username: string;
} & Pick<Message, 'content'>;

export const UserMessage: React.FC<Props> = ({ isShort, username, content }): JSX.Element => {
  return (
    <>
      {!isShort && <div className={s.username}>{username}</div>}
      <MessageContent content={content} />
      {content.attachments && <MessageAttachment attachments={content.attachments} />}
    </>
  );
};
