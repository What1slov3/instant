import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { setConnection, thunkGetChannels, thunkGetChats, useAppSelector } from '@shared/state';
import { parseURLtoConnection } from '@shared/utils';
import { Page } from '@shared/ui';
import { ChannelChatsList, ChannelGreetings, ChannelHeader, ChannelsList } from '@entities/channel';
import type { Channel, Chat, ChatGroup, ID } from '@shared/types';
import s from './channelspage.module.css';
import { MessageFeedWidget } from '@widgets/message/feed';
import { MessageInputWidget } from '@widgets/message/input';
import { ChannelTopBarWidget } from '@widgets/chat/channelTopbar';

export const ChannelsPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const location = useLocation();

  const connection = useAppSelector((state) => state.statuses.connection);
  const channels = useAppSelector((state) => state.channels.channels);
  const userChannels = useAppSelector((state) => state.user.channels);
  const loadedChannels = useAppSelector((state) => state.channels.channels);
  const loadedChats = useAppSelector((state) => state.chats);

  const [channel, setChannel] = useState<Channel | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatGroups, setChatGroups] = useState<ChatGroup<Chat>[]>([]);

  useEffect(() => {
    const channelsToLoad = userChannels.filter(
      (channel) => !channels.find((loadedChannels) => loadedChannels._id === channel)
    );

    if (channelsToLoad.length) {
      dispatch(thunkGetChannels({ ids: channelsToLoad }));
    }
  }, [userChannels]);

  useEffect(() => {
    return () => {
      dispatch(setConnection({ channelId: null, chatId: null }));
    };
  }, []);

  useEffect(() => {
    dispatch(setConnection({ ...parseURLtoConnection() }));
  }, [location]);

  useEffect(() => {
    if (connection.channelId) {
      const channel = loadedChannels.find((channel) => channel._id === connection.channelId);
      if (channel) {
        setChannel(channel);
      }
    } else {
      setChannel(null);
    }
  }, [connection.channelId, loadedChannels]);

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

  useEffect(() => {
    if (channel) {
      const chatsToLoad: ID[] = channel.chatGroups.reduce((prev, curr) => {
        return [...prev, ...curr.chats.filter((chatId) => !loadedChats[chatId])];
      }, [] as ID[]);
      if (chatsToLoad.length) {
        dispatch(thunkGetChats({ ids: chatsToLoad }));
      }

      const currentChannelChatsGroup = channel.chatGroups.map((chatGroup) => {
        return {
          _id: chatGroup._id,
          name: chatGroup.name,
          chats: chatGroup.chats.map((chatId) => loadedChats[chatId]),
        };
      });
      setChatGroups(currentChannelChatsGroup);
    }
  }, [loadedChats, channel]);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }} title="Instant | Каналы">
      <ChannelsList connection={connection} channels={channels} />
      {channel ? (
        <div className={s.channelWindow}>
          <div className={classNames(s.channelSidebar, 'secondary-shadow')}>
            <ChannelHeader name={channel.name} banner={channel.banner} _id={channel._id} />
            <ChannelChatsList chatGroups={chatGroups} connection={connection} loadedChats={loadedChats} />
          </div>
          {chat && (
            <div className={s.main}>
              <ChannelTopBarWidget activeChatName={chat.name} />
              <MessageFeedWidget chat={chat} />
              <MessageInputWidget connection={connection} placeholder={`Написать в #${chat.name}`} />
            </div>
          )}
        </div>
      ) : (
        <ChannelGreetings />
      )}
    </Page>
  );
};
