import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
  setConnection,
  thunkGetChannels,
  thunkGetChats,
  thunkGetPermissions,
  thunkInitChats,
  useAppSelector,
} from '@shared/state';
import { parseURLtoConnection } from '@shared/utils';
import { Page } from '@shared/ui';
import { ChannelGreetings, ChannelHeader, ChannelsList } from '@entities/channel';
import { MessageFeedWidget } from '@widgets/message/feed';
import { MessageInputWidget } from '@widgets/message/input';
import { ChannelTopBarWidget } from '@widgets/chat/channelTopbar';
import { ChannelChatsList } from '@features/channel/view-channel-chats';
import { Permissions } from '@shared/libs';
import type { Channel, Chat, ChatGroup, Connection, ID } from '@shared/types';
import s from './channelspage.module.css';

export const ChannelsPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const location = useLocation();

  const user = useAppSelector((state) => state.user);
  const connection = useAppSelector((state) => state.statuses.connection);
  const channels = useAppSelector((state) => state.channels.channels);
  const userChannels = useAppSelector((state) => state.user.channels);
  const loadedChannels = useAppSelector((state) => state.channels.channels);

  const [channel, setChannel] = useState<Channel | null>(null);

  // ? Сбрасываем информацию о текущих открытых канале и чате
  useEffect(() => {
    return () => {
      dispatch(setConnection({ channelId: null, chatId: null }));
    };
  }, []);

  // ? Инициализируем каналы, догружаем отсутствующие
  useEffect(() => {
    const channelsToLoad = userChannels.filter(
      (channel) => !channels.find((loadedChannels) => loadedChannels.id === channel)
    );

    if (channelsToLoad.length) {
      dispatch(thunkGetChannels({ ids: channelsToLoad }));
    }
  }, [userChannels]);

  // ? Достаем из URL id канала и чата
  useEffect(() => {
    dispatch(setConnection({ ...parseURLtoConnection() }));
  }, [location]);

  useEffect(() => {
    if (connection.channelId) {
      const channel = loadedChannels.find((channel) => channel.id === connection.channelId);
      if (channel) {
        setChannel(channel);
      }
    } else {
      setChannel(null);
    }
  }, [connection.channelId, loadedChannels]);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }} title="Instant | Каналы">
      <ChannelsList connection={connection} channels={channels} />
      {channel ? (
        <PageLogic channel={channel} connection={connection} isOwner={user.id === channel.ownerId} />
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

export const PageLogic: React.FC<Props> = ({ channel, connection, isOwner }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const loadedChats = useAppSelector((state) => state.chats);

  const [chat, setChat] = useState<Chat | null>(null);
  const [chatGroups, setChatGroups] = useState<ChatGroup<Chat>[]>([]);

  // ? Загружаем права доступа пользователя на данный канал
  useEffect(() => {
    if (!Permissions.checkPermissionsExist('channel', channel.id)) {
      dispatch(thunkGetPermissions({ context: 'channel', contextId: channel.id }));
    }
  }, [channel.id]);

  useEffect(() => {
    if (connection.chatId) {
      const chat = loadedChats[connection.chatId];
      if (chat) {
        setChat(chat);
      }
    } else {
      setChat(null);
    }
  }, [connection.chatId, loadedChats]);

  // Загрузка чатов и наполнение чатгрупп сущностями чатов
  useEffect(() => {
    if (channel.chatGroups) {
      // Ищем чаты, отстуствующие в сторе редакса
      const notLoadedChatsIds: ID[] = channel.chatGroups.reduce((prev, curr) => {
        prev.push(...curr.chats.filter((chatId) => !loadedChats[chatId]));
        return prev;
      }, [] as ID[]);

      if (notLoadedChatsIds.length) {
        dispatch(thunkGetChats({ ids: notLoadedChatsIds }));
      }
    } else {
      dispatch(thunkInitChats(channel.id));
    }
  }, [channel.chatGroups]);

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
      {chat && (
        <div className={s.main}>
          <ChannelTopBarWidget chatName={chat.name} connection={connection} />
          <MessageFeedWidget chat={chat} channelName={channel.name} />
          <MessageInputWidget connection={connection} placeholder={`Написать в #${chat.name}`} />
        </div>
      )}
    </div>
  );
};
