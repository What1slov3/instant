import { useEffect, useMemo, useState } from 'react';
import { UserListCard } from '@entities/user';
import { useAppSelector } from '@shared/state';
import { InfiniteScroll } from '@shared/components';
import { useUsersCache } from '@shared/hooks';
import { config } from '@shared/config';
import s from './viewchatmembers.module.css';

type Props = {
  chatId: string;
};

export const ViewChatMembers: React.FC<Props> = ({ chatId }): JSX.Element => {
  // ? Пока отсутвует функционал прав доступа к чату и онлайн-статус
  // ? то просто берем всех юзеров канала
  const channelMembers = useAppSelector(
    (state) =>
      state.channels.channels.find((channel) =>
        channel.chatGroups?.find((chatGroup) => chatGroup.chats.includes(chatId))
      )!.members
  );

  const { cache, isLoading } = useUsersCache();

  const [page, setPage] = useState(1);
  const [setted, setSetted] = useState(false);

  // TODO временный фикс для корректной установки рефа в скролле
  useEffect(() => {
    setSetted(true);
  }, []);

  const loadUsers = () => {
    setPage((prev) => prev + 1);
  };

  const renderUserCards = useMemo(() => {
    return channelMembers.slice(0, page * config.GET_USERS_LIST_LIMIT).map((userId) => {
      if (cache[userId]) {
        return <UserListCard key={userId} {...cache[userId]} />;
      }
    });
  }, [cache, channelMembers, page]);

  return (
    <div className={s.scroller}>
      <InfiniteScroll
        direction="bottom"
        next={loadUsers}
        hasMore={page < Math.ceil(channelMembers.length / config.GET_USERS_LIST_LIMIT)}
        loading={isLoading}
      >
        {setted && renderUserCards}
      </InfiniteScroll>
    </div>
  );
};
