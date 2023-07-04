import classNames from 'classnames';
import { User } from '@shared/types';
import { Avatar } from '@shared/components';
import s from './userlistcard.module.css';

type Props = {
  controls?: {
    element: JSX.Element;
    onHover?: boolean;
  };
} & Pick<User, 'id' | 'avatar' | 'tag' | 'username'>;

export const UserListCard: React.FC<Props> = ({ id, avatar, tag, username, controls }): JSX.Element => {
  return (
    <div className={classNames({ [s.onHover]: controls?.onHover }, s.userCard, 'flex flexaic gap10')}>
      <Avatar url={avatar} width={50} />
      <div>
        <div className={s.username}>
          {username}
          <span>#{tag}</span>
        </div>
      </div>
      {controls && <div className={s.controls}>{controls.element}</div>}
    </div>
  );
};
