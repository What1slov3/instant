import { CSSProperties } from 'react';
import { Tooltip } from '@shared/components';
import { NavLink } from 'react-router-dom';
import s from './navigationpanel.module.css';

type PanelButtonProps = {
  tooltipText: string;
  link: string;
  faClassName: string;
  style?: CSSProperties;
};

const routes: PanelButtonProps[] = [
  // { tooltipText: 'Окружение', link: 'environment', faClassName: 'fa-solid fa-user-group' },
  // { tooltipText: 'Сообщения', link: 'messages', faClassName: 'fa-solid fa-envelope' },
  { tooltipText: 'Каналы', link: 'channels', faClassName: 'fa-solid fa-server' },
];

export const PanelButton: React.FC<PanelButtonProps> = ({ tooltipText, link, faClassName, style }): JSX.Element => {
  return (
    <Tooltip position="right" text={tooltipText} style={style}>
      <NavLink to={link} className={({ isActive }) => (isActive ? s.active : undefined)}>
        <i className={`${faClassName} ${s.navLink}`}></i>
      </NavLink>
    </Tooltip>
  );
};

const Panel: React.FC = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      {routes.map((route) => {
        return <PanelButton key={route.link} {...route} />;
      })}
    </div>
  );
};

export default { Panel, PanelButton };
