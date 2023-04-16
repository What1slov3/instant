import classNames from 'classnames';
import Button from '@layouts/Buttons/Button/Button';
import type { FCChildren } from '@customTypes/common.types';
import s from './styledbutton.module.css';

type Props = FCChildren & {
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onEnter?: Function;
};

const StyledButton: React.FC<Props> = ({ children, style, onClick, className, onEnter, onKeyDown }): JSX.Element => {
  return (
    <Button
      style={style}
      className={classNames(className, s.styledButton)}
      onClick={onClick}
      onEnter={onEnter}
      onKeyDown={onKeyDown}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
