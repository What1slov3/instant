import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import type { FCChildren } from '@shared/types';
import s from './modal.module.css';

type Props = {
  style?: CSSProperties;
  className?: string;
} & FCChildren;

export const ModalSegment: React.FC<Props> = ({ style, className, children }): JSX.Element => {
  return (
    <div className={classNames(s.segment, className)} style={style}>
      {children}
    </div>
  );
};
