import classNames from 'classnames';
import s from './channeltopbarwidget.module.css';

type Props = {
  activeChatName: string;
};

export const ChannelTopBarWidget: React.FC<Props> = ({ activeChatName }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, 'flex flexaic')}>
      <div className={s.chatName}>
        <span>#</span>
        {activeChatName}
      </div>
    </div>
  );
};
