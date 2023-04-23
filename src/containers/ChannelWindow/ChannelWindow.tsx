import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import ChannelHeader from '@components/PageChannelsComponents/ChannelHeader/ChannelHeader';
import ChannelGreetings from '@components/PageChannelsComponents/ChannelGreetings/ChannelGreetings';
import ChannelChatsList from '@components/PageChannelsComponents/ChannelChatsList/ChannelChatsList';
import ChannelTopBar from '@components/PageChannelsComponents/ChannelTopBar/ChannelTopBar';
import ChatWindow from '@containers/ChatWindow/ChatWindow';
import MessageInput from '@containers/ChatInput/ChatInput';
import { parseURLtoConnection } from '@common/utils';
import { setConnection, thunkGetChats, useAppSelector } from '@state/index';
import type { Channel, Chat, ChatGroup, Connection, ID } from '@customTypes/index';
import s from './channelwindow.module.css';

type Props = {
  connection: Connection;
};

const ChannelWindow: React.FC<Props> = ({ connection }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const location = useLocation();

  const loadedChannels = useAppSelector((state) => state.channels.channels);
  const loadedChats = useAppSelector((state) => state.chats);

  const [channel, setChannel] = useState<Channel | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatGroups, setChatGroups] = useState<ChatGroup<Chat>[]>([]);

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

  return channel ? (
    <div className={s.channelWindow}>
      <div className={classNames(s.channelSidebar, 'secondary-shadow')}>
        <ChannelHeader name={channel.name} banner={channel.banner} _id={channel._id} />
        <ChannelChatsList chatGroups={chatGroups} connection={connection} loadedChats={loadedChats} />
      </div>
      {chat && (
        <div className={s.main}>
          <ChannelTopBar activeChatName={chat.name} />
          <ChatWindow chat={chat} />
          <MessageInput placeholder={`Написать в #${chat.name}`} connection={connection} />
        </div>
      )}
    </div>
  ) : (
    <ChannelGreetings />
  );
};

export default ChannelWindow;
