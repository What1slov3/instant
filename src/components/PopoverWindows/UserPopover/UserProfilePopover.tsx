import type { User } from '@customTypes/index';
import s from './userprofilepopover.module.css';

type Props = Pick<User, 'username' | 'tag' | 'avatar'> & {};

const UserProfilePopover: React.FC<Props> = ({ username, tag, avatar }): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.mainInfo}>
        <span className={s.username}>{username}</span>
        <span className={s.tag}>#{tag}</span>
      </div>
      <div>Перейти в профиль</div>
      <div>Настройки</div>
    </div>
  );
};

export default UserProfilePopover;
