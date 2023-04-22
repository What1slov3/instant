import type { FCChildren } from '@customTypes/common.types';
import s from './input.module.css';
import classNames from 'classnames';

const InputTitleError: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <span className={classNames(s.inputTitleError, 'smoothAppearance')}> | {children}</span>;
};

export default InputTitleError;
