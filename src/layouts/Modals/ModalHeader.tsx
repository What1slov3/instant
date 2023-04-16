import classNames from 'classnames';
import { CSSProperties } from 'react';
import type { FC } from 'react';
import type { FCChildren } from '@customTypes/common.types';
import s from './modal.module.css';

type Props = {
  style?: CSSProperties;
  className?: string;
} & FCChildren;

const ModalHeader: FC<Props> = ({ style, className, children }): JSX.Element => {
  return (
    <h2 className={classNames(s.header, className)} style={style}>
      {children}
    </h2>
  );
};

export default ModalHeader;
