import classNames from 'classnames';
import s from './iconbutton.module.css';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  faClass: string;
  className?: string;
  style?: React.CSSProperties;
} & JSX.IntrinsicElements['i'];

export const IconButton: React.FC<Props> = ({ onClick, faClass, className, style, ...props }): JSX.Element => {
  return <i className={classNames(s.iconButton, faClass, className)} style={style} onClick={onClick} {...props}></i>;
};
