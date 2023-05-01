import type { FCChildren } from '@shared/types';
import s from './input.module.css';

export const InputTitle: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <div className={s.inputTitle}>{children}</div>;
};