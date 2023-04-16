import type { FCChildren } from '@customTypes/common.types';
import s from './input.module.css';

const InputTitle: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <div className={s.inputTitle}>{children}</div>;
};

export default InputTitle;
