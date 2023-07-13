import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { thunkGetPermissions, useAppSelector } from '@shared/state';
import { parseURLtoConnection } from '@shared/utils';
import { Page } from '@shared/ui';
import { ChannelGreetings, ChannelHeader, ChannelsList } from '@entities/channel';
import { MessageFeedWidget } from '@widgets/message/feed';
import { MessageInputWidget } from '@widgets/message/input';
import { ChannelTopBarWidget } from '@widgets/chat/channelTopbar';
import { ChannelChatsList } from '@features/channel/view-channel-chats';
import { Permissions } from '@shared/libs';
import { effects } from '../model/effects';
import { hooks } from '../lib/hooks';
import type { Channel, Chat, ChatGroup, Connection, ID } from '@shared/types';
import s from './channelspage.module.css';

export const ChannelsPage: React.FC = (): JSX.Element => {
  const location = useLocation();

  const user = useAppSelector((state) => state.user);
  const connection = useAppSelector((state) => state.statuses.connection);
  const channels = useAppSelector((state) => state.channels);

  hooks.useInitChannels();
  hooks.useChangeActualConnection();

  // ? Сбрасываем информацию о текущих открытых канале и чате
  useEffect(() => {
    return () => {
      effects.resetConnection();
    };
  }, []);

  // ? Достаем из URL id канала и чата
  useEffect(() => {
    effects.setConnection(parseURLtoConnection());
  }, [location]);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }} title="Instant | Каналы">
      <ChannelsList connection={connection} channels={channels} />
      {connection.channel ? (
        <SelectedChannel
          channel={connection.channel}
          connection={connection}
          isOwner={user.id === connection.channel.ownerId}
        />
      ) : (
        <ChannelGreetings />
      )}
    </Page>
  );
};

type Props = {
  channel: Channel;
  connection: Connection;
  isOwner: boolean;
};

export const SelectedChannel: React.FC<Props> = ({ channel, connection, isOwner }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const loadedChats = useAppSelector((state) => state.chats);

  const [chatGroups, setChatGroups] = useState<ChatGroup<Chat>[]>([]);

  // ? Загружаем права доступа пользователя на данный канал
  useEffect(() => {
    if (!Permissions.checkPermissionsExist('channel', channel.id)) {
      dispatch(thunkGetPermissions({ context: 'channel', contextId: channel.id }));
    }
  }, [channel.id]);

  hooks.useInitChats();

  // ? Собираем чаты в чат-группы
  useEffect(() => {
    if (channel.chatGroups) {
      const chatGroupsWithChats = channel.chatGroups.map((chatGroup) => {
        return {
          id: chatGroup.id,
          name: chatGroup.name,
          chats: chatGroup.chats.map((chatId) => loadedChats[chatId]),
          owningChannelId: chatGroup.owningChannelId,
        };
      });
      setChatGroups(chatGroupsWithChats);
    }
  }, [channel.chatGroups, loadedChats]);

  return (
    <div className={s.channelWindow}>
      <div className={classNames(s.channelSidebar, 'secondary-shadow')}>
        <ChannelHeader name={channel.name} banner={channel.banner} id={channel.id} isOwner={isOwner} />
        <ChannelChatsList chatGroups={chatGroups} connection={connection} loadedChats={loadedChats} />
      </div>
      {connection.chat && (
        <div className={s.main}>
          <ChannelTopBarWidget chatName={connection.chat.name} connection={connection} />
          <MessageFeedWidget chat={connection.chat} />
          <MessageInputWidget connection={connection} placeholder={`Написать в #${connection.chat.name}`} />
        </div>
      )}
    </div>
  );
};
