import { CSSProperties } from 'react';
import classNames from 'classnames';
import type { TooltipPosition } from '../Tooltip';
import s from './tooltipbox.module.css';

type TProps = {
  style?: CSSProperties;
  children?: any;
  trianglePosition: TooltipPosition;
};

export const TooltipBox: React.FC<TProps> = ({ children, style, trianglePosition }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, s[trianglePosition])} style={style}>
      {children}
    </div>
  );
};