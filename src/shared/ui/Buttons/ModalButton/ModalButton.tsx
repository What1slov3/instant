import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import { StyledButton } from '../StyledButton/StyledButton';
import type { FCChildren } from '@shared/types';
import s from './modalbutton.module.css';

type Props = {
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
  onEnter?: Function;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  disabled?: boolean;
} & FCChildren;

export const ModalButton: React.FC<Props> = ({
  children,
  onClick,
  className,
  style,
  onEnter,
  onKeyDown,
  disabled = false,
}): JSX.Element => {
  return (
    <StyledButton
      className={classNames(s.modalButton, className, { [s.disabled]: disabled })}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onEnter={onEnter}
      style={style}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
