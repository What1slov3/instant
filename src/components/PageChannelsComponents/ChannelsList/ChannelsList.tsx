import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Tooltip from '@components/Tooltip/Tooltip';
import Line from '@layouts/Line/Line';
import { useModalControls } from '@common/hooks/useModalControls';
import type { Channel, Connection, ID } from '@customTypes/index';
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

const ChannelsList: React.FC<Props> = ({ connection, channels }): JSX.Element => {
  const modalControls = useModalControls();

  const handleCreateChannel = () => {
    modalControls.open({ name: 'createChannel' });
  };

  const renderChannels = () => {
    return channels.map((channel) => {
      return (
        <ChannelItem
          key={channel._id}
          iconUrl={channel.icon}
          name={channel.name}
          channelId={channel._id}
          openingChatId={channel.systemChatId}
          isActive={connection.channelId === channel._id}
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

export default ChannelsList;
