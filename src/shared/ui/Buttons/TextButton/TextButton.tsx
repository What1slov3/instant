import classNames from 'classnames';
import { Button } from '../Button/Button';
import type { FCChildren } from '@shared/types';
import s from './textbutton.module.css';

type Props = FCChildren & {
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onEnter?: Function;
  disabled?: boolean;
};

export const TextButton: React.FC<Props> = ({
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
      className={classNames(className, s.textButton, { [s.disabled]: disabled })}
      onClick={onClick}
      onEnter={onEnter}
      onKeyDown={onKeyDown}
    >
      {children}
    </Button>
  );
};
