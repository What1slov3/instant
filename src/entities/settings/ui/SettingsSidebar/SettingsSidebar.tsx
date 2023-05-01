import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Button } from '@shared/ui';
import { logout } from '@shared/api/rest';
import s from './settingssidebar.module.css';

type SidebarElement = { title: string; link: string };
type SidebarStructureElement = { title: string; links: SidebarElement[] };

const sidebarStructure: SidebarStructureElement[] = [
  { title: 'Настройки учетной записи', links: [{ title: 'Учетная запись', link: 'profile' }] },
  { title: 'Настройки приложения', links: [{ title: 'Внешний вид', link: 'appearance' }] },
];

const SettingsSidebar: React.FC = (): JSX.Element => {
  return (
    <div className={classNames(s.wrapper, 'flex flexjcsb flexcolumn gap10')}>
      <div>
        {sidebarStructure.map((section) => {
          return (
            <div key={section.title} className={s.section}>
              <div className={classNames(s.sectionName, 'textOverflowEllipsis')}>{section.title}</div>
              <div className={s.sectionElements}>
                {section.links.map((elem) => {
                  return (
                    <NavLink
                      key={elem.link}
                      to={elem.link}
                      className={({ isActive }) => (isActive ? s.active : undefined)}
                    >
                      {elem.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Button className={classNames(s.logout, 'flex flexjcsb flexaic')} onClick={logout} onKeyDown={logout}>
          Выйти <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </Button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
