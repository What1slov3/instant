import Avatar from '../Avatar/Avatar';
import Navigation from './NavigationPanel/NavigationPanel';
import Line from '@layouts/Line/Line';
import type { User } from '@customTypes/index';
import s from './sidepanel.module.css';

type Props = {
  user: User;
};

const SidePanel: React.FC<Props> = ({ user }): JSX.Element => {
  return (
    <nav className={s.wrapper}>
      <div>
        <div className={s.logo}></div>
        <Line />
      </div>
      <Navigation.Panel />
      <div>
        <Line />
        <Navigation.PanelButton
          tooltipText="Настройки"
          link="settings"
          faClassName="fa-solid fa-gear"
          style={{ marginBottom: '20px' }}
        />
        <Avatar url={user.avatar} />
      </div>
    </nav>
  );
};

export default SidePanel;
