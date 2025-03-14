import classNames from 'classnames';
import { User } from '@shared/types';
import { Avatar } from '@shared/components';
import s from './userlistcard.module.css';

type Props = {
  controls?: {
    element: JSX.Element;
    onHover?: boolean;
  };
  innerContent?: JSX.Element | null;
  isActive?: boolean;
} & Pick<User, 'id' | 'avatar' | 'tag' | 'username'>;

export const UserListCard: React.FC<Props> = ({
  id,
  avatar,
  tag,
  username,
  controls,
  innerContent,
  isActive,
}): JSX.Element => {
  return (
    <div className={classNames({ [s.onHover]: controls?.onHover, [s.active]: isActive }, s.userCard)}>
      <div className="flex flexaic gap10">
        <Avatar url={avatar} width={50} />
        <div>
          <div className={s.username}>
            {username}
            <span>#{tag}</span>
          </div>
        </div>
        {controls && <div className={s.controls}>{controls.element}</div>}
      </div>
      {innerContent && <div className={s.innerContent}>{innerContent}</div>}
    </div>
  );
};
