import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import type { FCChildren } from '@customTypes/common.types';
import s from './modal.module.css';

type Props = {
  style?: CSSProperties;
  className?: string;
} & FCChildren;

const ModalSegmentTitle: React.FC<Props> = ({ style, className, children }): JSX.Element => {
  return (
    <div className={classNames(s.segmentTitle, className)} style={style}>
      {children}
    </div>
  );
};

export default ModalSegmentTitle;
