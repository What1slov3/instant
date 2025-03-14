import classNames from 'classnames';
import { UserEditControls } from '../UserEditControls/UserEditControls';
import s from './usereditcontrolsblock.module.css';

type Props = {
  isOpen: boolean;
};

export const UserEditControlsBlock: React.FC<Props> = ({ isOpen }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, { [s.opened]: isOpen })}>
      <UserEditControls />
    </div>
  );
};
