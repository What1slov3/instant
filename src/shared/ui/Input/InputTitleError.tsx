import classNames from 'classnames';
import type { FCChildren } from '@shared/types';
import s from './input.module.css';

export const InputTitleError: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <span className={classNames(s.inputTitleError, 'smoothAppearance')}> | {children}</span>;
};