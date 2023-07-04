import classNames from 'classnames';
import type { FCChildren, ID } from '@shared/types';
import s from './channeldropdown.module.css';

type Props = {
  channelId: ID;
} & FCChildren;

export const ChannelDropdown: React.FC<Props> = ({  children }): JSX.Element => {
  return <div className={classNames(s.wrapper)}>{children}</div>;
};
