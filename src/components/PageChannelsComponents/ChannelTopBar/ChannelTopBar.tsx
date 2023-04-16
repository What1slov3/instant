import classNames from 'classnames';
import s from './channeltopbar.module.css';

type Props = {
  activeChatName: string;
};

const ChannelTopBar: React.FC<Props> = ({ activeChatName }): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, 'flex flexaic')}>
      <div className={s.chatName}>
        <span>#</span>
        {activeChatName}
      </div>
    </div>
  );
};

export default ChannelTopBar;
