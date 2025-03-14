import { useEffect, useMemo, useState } from 'react';
import { useUsersCache } from '@shared/hooks';
import { config } from '@shared/config';
import { InfiniteScroll } from '@shared/components';
import { ModerateUserCard } from '../ModerateUserCard/ModerateUserCard';
import type { Channel, ID } from '@shared/types';
import s from './moderatechannelusers.module.css';

type Props = {
  channel: Channel;
};

export const ModerateChannelUsers: React.FC<Props> = ({ channel }): JSX.Element => {
  const { cache, isLoading } = useUsersCache();

  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [editingUserId, setEditingUserId] = useState<ID>('');

  // TODO временный фикс для корректной установки рефа в скролле
  useEffect(() => {
    setMounted(true);
  }, []);

  const loadUsers = () => {
    setPage((prev) => prev + 1);
  };

  const renderUserCards = useMemo(() => {
    return channel.members.slice(0, page * config.GET_USERS_LIST_LIMIT).map((userId) => {
      if (cache[userId]) {
        return (
          <ModerateUserCard
            key={userId}
            {...cache[userId]}
            channelId={channel.id}
            isEditingOpen={userId === editingUserId}
            setIsEditing={() => {
              if (userId === editingUserId) {
                setEditingUserId('');
                return;
              }
              setEditingUserId(userId);
            }}
          />
        );
      }
    });
  }, [cache, channel.members, page, editingUserId]);

  return (
    <div className={s.scroller}>
      <InfiniteScroll
        direction="bottom"
        next={loadUsers}
        hasMore={page < Math.ceil(channel.members.length / config.GET_USERS_LIST_LIMIT)}
        loading={isLoading}
      >
        {mounted && renderUserCards}
      </InfiniteScroll>
    </div>
  );
};
