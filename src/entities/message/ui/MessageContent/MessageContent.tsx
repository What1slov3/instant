import { Message } from '@shared/types';
import { completeMessageFormating } from '@shared/libs';
import s from './messagecontent.module.css';

type Props = Pick<Message, 'content'>;

export const MessageContent: React.FC<Props> = ({ content }): JSX.Element => {
  return <div className={s.content}>{completeMessageFormating(content.text)}</div>;
};
