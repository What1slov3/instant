import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import StyledButton from '../StyledButton/StyledButton';
import type { FCChildren } from '@customTypes/common.types';
import s from './modalbutton.module.css';

type Props = {
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
  onEnter?: Function;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
} & FCChildren;

const ModalButton: React.FC<Props> = ({ children, onClick, className, style, onEnter, onKeyDown }): JSX.Element => {
  return (
    <StyledButton
      className={classNames(s.modalButton, className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onEnter={onEnter}
      style={style}
    >
      {children}
    </StyledButton>
  );
};

export default ModalButton;
