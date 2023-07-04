import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Button } from '@shared/ui';
import { logout } from '@shared/api/rest';
import { sidebarStructure } from '../../model/structure';
import s from './settingsnavbar.module.css';

export const SettingsNavbar: React.FC = (): JSX.Element => {
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
                      className={({ isActive }) => (isActive ? `${s.active} ${s.navTab}` : s.navTab)}
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
