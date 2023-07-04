import classNames from 'classnames';
import { channelNavBarSettingsTabs } from '../../model/data';
import { CustomNavbarSetter } from '@shared/hooks';
import s from './channelsettingsnavbar.module.css';

type Props = {
  activeTab: (typeof channelNavBarSettingsTabs)[number];
  setActiveTab: CustomNavbarSetter;
};

export const ChannelNavBarSettings: React.FC<Props> = ({ activeTab, setActiveTab }): JSX.Element => {
  const renderTabs = () => {
    return channelNavBarSettingsTabs.map((tab) => {
      return (
        <li className={classNames({ [s.isActive]: activeTab === tab }, s.navTab)}>
          <button className="textOverflowEllipsis" onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        </li>
      );
    });
  };

  return <ul className={classNames(s.wrapper, 'flex flexcolumn')}>{renderTabs()}</ul>;
};
