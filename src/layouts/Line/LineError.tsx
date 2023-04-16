import type { FCChildren } from '@customTypes/index';
import s from './line.module.css';

const LineError: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <div className={s.lineError}>{children}</div>;
};

export default LineError;
