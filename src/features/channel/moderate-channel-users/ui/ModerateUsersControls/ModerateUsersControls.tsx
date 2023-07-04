import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import type { ID } from '@shared/types';
import s from './moderateuserscontrols.module.css';
import { useDispatch } from 'react-redux';
import { kickChannelUser } from '@shared/state';

type Props = {
  channelId: ID;
  userId: ID;
  isCurrentUser: boolean;
};

export const ModerateUsersControls: React.FC<Props> = ({ channelId, userId, isCurrentUser }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const kick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.classList.add(s.fly);

    setTimeout(() => {
      dispatch(kickChannelUser({ channelId, userId }));
      target.classList.remove(s.fly);
    }, 500);
  };

  return (
    <>
      <Tooltip text="Выгнать" positioning="absolute">
        {!isCurrentUser && (
          <button className={classNames(s.controlButton, s.kick)} onClick={kick}>
            <i className="fa-solid fa-rocket"></i>
          </button>
        )}
      </Tooltip>
    </>
  );
};
