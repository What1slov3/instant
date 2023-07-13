import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkGetChannels, thunkGetChats, thunkInitChats, useAppSelector } from '@shared/state';
import { effects } from '../model/effects';
import type { ID } from '@shared/types';

export const hooks = {
  // ? Инициализируем каналы, догружаем отсутсвующие
  useInitChannels() {
    const dispatch = useDispatch<any>();

    const channels = useAppSelector((state) => state.channels);
    const userChannels = useAppSelector((state) => state.user.channels);

    useEffect(() => {
      const notLoaded = userChannels.filter((channelId) => !channels[channelId]);

      if (notLoaded.length) {
        dispatch(thunkGetChannels({ ids: notLoaded }));
      }
    }, [userChannels]);
  },

  // ? Инициализируем каналы текущего канала, догружаем отсутсвующие
  useInitChats() {
    const dispatch = useDispatch<any>();

    const channel = useAppSelector((state) => state.statuses.connection.channel!);
    const chats = useAppSelector((state) => state.chats);

    // Загрузка чатов и наполнение чатгрупп сущностями чатов
    useEffect(() => {
      if (channel.chatGroups) {
        // Ищем чаты, отстуствующие в сторе редакса
        const notLoaded: ID[] = channel.chatGroups.reduce((prev, chatGroup) => {
          prev.push(...chatGroup.chats.filter((chatId) => !chats[chatId]));
          return prev;
        }, [] as ID[]);

        if (notLoaded.length) {
          dispatch(thunkGetChats({ ids: notLoaded }));
        }
      } else {
        dispatch(thunkInitChats(channel.id));
      }
    }, [channel.chatGroups]);
  },

  // ? Меняем channel/chat в state
  // TODO оптмизировать useEffect по возможности
  useChangeActualConnection() {
    const connection = useAppSelector((state) => state.statuses.connection);
    const channels = useAppSelector((state) => state.channels);
    const chats = useAppSelector((state) => state.chats);

    useEffect(() => {
      if (connection.channelId) {
        const channel = channels[connection.channelId];
        if (channel) {
          effects.setConnection({ channel });
        }
      } else {
        effects.setConnection({ channel: null });
      }
    }, [connection.channelId, channels]);

    useEffect(() => {
      if (connection.chatId) {
        if (chats[connection.chatId]) {
          effects.setConnection({ chat: chats[connection.chatId] });
        }
      } else {
        effects.setConnection({ chat: null });
      }
    }, [connection.chatId, chats]);
  },
};
