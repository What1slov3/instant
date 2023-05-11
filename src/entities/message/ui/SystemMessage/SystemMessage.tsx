import { MessageContent } from '../MessageContent/MessageContent';
import type { Message } from '@shared/types';
import s from './systemmessage.module.css';

type Props = {
  isShort?: boolean;
  username: string;
} & Pick<Message, 'content'>;

export const SystemMessage: React.FC<Props> = ({ isShort, username, content }): JSX.Element => {
  return (
    <>
      {!isShort && (
        <div className="flex flexaic">
          <span className={s.systemName}>{username}</span>
          <span className={s.channelName}>канал</span>
        </div>
      )}
      <MessageContent content={content} />
    </>
  );
};
