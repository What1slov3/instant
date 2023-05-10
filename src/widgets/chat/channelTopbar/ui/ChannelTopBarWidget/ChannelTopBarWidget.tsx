import classNames from 'classnames';
import { ChatName } from '@entities/chat';
import { ChatControls } from '@features/chat/chat-controls';
import type { ID } from '@shared/types';
import s from './channeltopbarwidget.module.css';

type Props = {
  chatName: string;
  chatId: ID;
};

export const ChannelTopBarWidget: React.FC<Props> = ({ chatName, chatId }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, 'flex flexaic flexjcsb')}>
      <ChatName name={chatName} />
      <ChatControls chatId={chatId} />
    </div>
  );
};
