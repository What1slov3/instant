import classNames from 'classnames';
import { useAppSelector } from '@shared/state';
import { ModalHeader } from '@shared/ui';
import { ChannelNavBarSettings, channelNavBarSettingsTabs } from '@features/channel/update-channel-settings';
import { BasicPage } from './pages/BasicPage/BasicPage.modalpage';
import { ModerationPage } from './pages/ModerationPage/ModerationPage.modalpage';
import { useCustomNavbar } from '@shared/hooks';
import s from './channelsettingsmodal.module.css';

export const ChannelSettingsModal: React.FC = (): JSX.Element => {
  const connection = useAppSelector((state) => state.statuses.connection);
  const channels = useAppSelector((state) => state.channels.channels);
  const user = useAppSelector((state) => state.user);

  const channel = channels.find((channel) => channel.id === connection.channelId)!;

  const [activeTab, setActiveTab] = useCustomNavbar(channelNavBarSettingsTabs, 'Главная');

  const renderPages = () => {
    switch (activeTab) {
      case 'Главная':
        return <BasicPage channel={channel} />;
      case 'Участники':
        return <ModerationPage channel={channel} user={user} />;
    }
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader className={s.header}>
        Настройки «<span className={s.channelName}>{channel.name}</span>»
      </ModalHeader>
      <ChannelNavBarSettings activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderPages()}
    </div>
  );
};
