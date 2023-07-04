import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useModalControls } from '@shared/hooks';
import { Tooltip } from '@shared/components';
import { Line } from '@shared/ui';
import type { Channel, Connection, ID } from '@shared/types';
import s from './channelslist.module.css';

type PropsChannelItem = {
  iconUrl: string;
  name: string;
  channelId: ID;
  openingChatId: ID;
  isActive: boolean;
};

const ChannelItem: React.FC<PropsChannelItem> = ({
  iconUrl,
  name,
  channelId,
  openingChatId,
  isActive,
}): JSX.Element => {
  return (
    <Link
      key={channelId}
      to={`/channels/${channelId}/${openingChatId}`}
      className={classNames({ [s.active]: isActive })}
    >
      <Tooltip position="right" text={name}>
        <div className={s.channelItem} style={{ background: `url(${iconUrl}) no-repeat center / cover` }}></div>
      </Tooltip>
    </Link>
  );
};

type Props = {
  connection: Connection;
  channels: Channel[];
};

export const ChannelsList: React.FC<Props> = ({ connection, channels }): JSX.Element => {
  const modalControls = useModalControls();

  const handleCreateChannel = () => {
    modalControls.open({ name: 'createChannel' });
  };

  const renderChannels = () => {
    return channels.map((channel) => {
      return (
        <ChannelItem
          key={channel.id}
          iconUrl={channel.icon}
          name={channel.name}
          channelId={channel.id}
          openingChatId={channel.systemChatId}
          isActive={connection.channelId === channel.id}
        />
      );
    });
  };

  return (
    <div className={s.wrapper}>
      <Tooltip text="Создать канал" position="right">
        <button className={`${s.createChannel} flex flexaic flexjcc`} onClick={handleCreateChannel}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </Tooltip>
      <Line />
      <div className={s.channelsList}>{renderChannels()}</div>
    </div>
  );
};
