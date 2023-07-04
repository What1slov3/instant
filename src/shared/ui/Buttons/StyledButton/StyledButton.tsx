import classNames from 'classnames';
import { Button } from '../Button/Button';
import type { FCChildren } from '@shared/types';
import s from './styledbutton.module.css';

type Props = FCChildren & {
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onEnter?: Function;
  disabled?: boolean;
};

export const StyledButton: React.FC<Props> = ({
  children,
  style,
  onClick,
  className,
  onEnter,
  onKeyDown,
  disabled = false,
}): JSX.Element => {
  return (
    <Button
      style={style}
      className={classNames(className, s.styledButton, { [s.disabled]: disabled })}
      onClick={onClick}
      onEnter={onEnter}
      onKeyDown={onKeyDown}
    >
      {children}
    </Button>
  );
};
