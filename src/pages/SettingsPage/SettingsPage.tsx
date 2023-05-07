import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Page } from '@shared/ui';
import SettingsSidebar from '@entities/settings/ui/SettingsSidebar/SettingsSidebar';
import AppearanceSubpage from '@entities/settings/ui/AppearanceSubpage/AppearanceSubpage';
import { ProfileSettingsPage } from './ProfileSettingsPage/ProfileSettingsPage';
import type { UserState } from '@shared/types';
import s from './settingspage.module.css';

type Props = {
  user: UserState;
};

export const SettingsPage: React.FC<Props> = ({ user }): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('profile');
  }, []);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '10px' }} title="Instant | Настройки">
      <SettingsSidebar />
      <Routes>
        <Route
          path="profile"
          element={
            <ProfileSettingsPage
              username={user.username}
              avatar={user.avatar}
              tag={user.tag}
              email={user.email}
              createdAt={user.createdAt}
              loadingStatus={user.loadingStatus}
            />
          }
        />
        <Route path="appearance" element={<AppearanceSubpage />} />
      </Routes>
    </Page>
  );
};
