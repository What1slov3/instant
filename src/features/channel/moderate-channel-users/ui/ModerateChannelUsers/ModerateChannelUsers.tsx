import { useEffect, useMemo, useState } from 'react';
import { useUsersCache } from '@shared/hooks';
import { config } from '@shared/config';
import { InfiniteScroll } from '@shared/components';
import { UserListCard } from '@entities/user';
import { ModerateUsersControls } from '../ModerateUsersControls/ModerateUsersControls';
import type { Channel, User } from '@shared/types';
import s from './moderatechannelusers.module.css';

type Props = {
  channel: Channel;
  user: User;
};

export const ModerateChannelUsers: React.FC<Props> = ({ channel, user }): JSX.Element => {
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
    return channel.members.slice(0, page * config.GET_USERS_LIST_LIMIT).map((userId) => {
      if (cache[userId]) {
        return (
          <UserListCard
            key={userId}
            {...cache[userId]}
            controls={{
              element: (
                <ModerateUsersControls
                  channelId={channel.id}
                  userId={cache[userId].id}
                  isCurrentUser={userId === user.id}
                />
              ),
            }}
          />
        );
      }
    });
  }, [cache, channel.members, page]);

  return (
    <div className={s.scroller}>
      <InfiniteScroll
        direction="bottom"
        next={loadUsers}
        hasMore={page < Math.ceil(channel.members.length / config.GET_USERS_LIST_LIMIT)}
        loading={isLoading}
      >
        {setted && renderUserCards}
      </InfiniteScroll>
    </div>
  );
};
