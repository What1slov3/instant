import { User } from '@shared/types';
import s from './userprofile.module.css';

type Props = {
  avatarComponent: JSX.Element;
} & Pick<User, 'username' | 'tag' | 'createdAt'>;

export const UserProfile: React.FC<Props> = ({ avatarComponent, username, tag, createdAt }): JSX.Element => {
  return (
    <div className={s.wrapper}>
      {avatarComponent}
      <div className={s.info}>
        <div className={s.username}>
          {username}
          <span>#{tag}</span>
        </div>
        <div className={s.registerDate}>
          В Instant с <span>{new Date(createdAt).toLocaleDateString('ru-RU')}</span>
        </div>
      </div>
    </div>
  );
};
