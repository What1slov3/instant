import classNames from 'classnames';
import { ChatName } from '@entities/chat';
import { ChatControls } from '@features/chat/chat-controls';
import type { Connection } from '@shared/types';
import s from './channeltopbarwidget.module.css';

type Props = {
  chatName: string;
  connection: Connection;
};

export const ChannelTopBarWidget: React.FC<Props> = ({ chatName, connection }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, 'flex flexaic flexjcsb')}>
      <ChatName name={chatName} />
      <ChatControls connection={connection} />
    </div>
  );
};
