import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { Permissions } from '@shared/libs';
import { effects } from '../../model/effects';
import { EPermissions, type ID } from '@shared/types';
import s from './moderateuserscontrols.module.css';

type Props = {
  channelId: ID;
  userId: ID;
  isCurrentUser: boolean;
};

export const ModerateUsersControls: React.FC<Props> = ({ channelId, userId, isCurrentUser }): JSX.Element => {
  const kick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.classList.add(s.fly);

    setTimeout(() => {
      effects.kickUser(channelId, userId);
      target.classList.remove(s.fly);
    }, 500);
  };

  return (
    <>
      {Permissions.checkPermissions({
        context: 'channel',
        requiredPermissions: [EPermissions['OWNER'], EPermissions['ADMIN']],
        mode: 'or',
      }) && (
        <Tooltip text="Выгнать" positioning="absolute">
          {!isCurrentUser && (
            <button className={classNames(s.controlButton, s.kick)} onClick={kick}>
              <i className="fa-solid fa-rocket"></i>
            </button>
          )}
        </Tooltip>
      )}
    </>
  );
};
