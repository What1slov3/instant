import type { FCChildren } from '@shared/types';
import s from './line.module.css';

export const LineError: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <div className={s.lineError}>{children}</div>;
};
