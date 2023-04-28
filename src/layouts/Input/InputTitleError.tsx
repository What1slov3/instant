import classNames from 'classnames';
import type { FCChildren } from '@customTypes/common.types';
import s from './input.module.css';

const InputTitleError: React.FC<FCChildren> = ({ children }): JSX.Element => {
  return <span className={classNames(s.inputTitleError, 'smoothAppearance')}> | {children}</span>;
};

export default InputTitleError;
