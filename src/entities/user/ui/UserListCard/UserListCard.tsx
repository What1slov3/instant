import classNames from 'classnames';
import { User } from '@shared/types';
import { Avatar } from '@shared/components';
import s from './userlistcard.module.css';

type Props = Pick<User, '_id' | 'avatar' | 'tag' | 'username'>;

export const UserListCard: React.FC<Props> = ({ _id, avatar, tag, username }): JSX.Element => {
  return (
    <div className={classNames(s.userCard, 'flex flexaic gap10')}>
      <Avatar url={avatar} width={50} />
      <div>
        <div className={s.username}>
          {username}
          <span>#{tag}</span>
        </div>
      </div>
    </div>
  );
};
