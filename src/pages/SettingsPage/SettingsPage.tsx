import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@shared/state';
import { Page } from '@shared/ui';
import SettingsSidebar from '@entities/settings/ui/SettingsSidebar/SettingsSidebar';
import UserProfileSubpage from '@entities/settings/ui/UserProfileSubpage/UserProfileSubpage';
import AppearanceSubpage from '@entities/settings/ui/AppearanceSubpage/AppearanceSubpage';
import s from './settingspage.module.css';

export const SettingsPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

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
            <UserProfileSubpage
              username={user.username}
              avatar={user.avatar}
              tag={user.tag}
              email={user.email}
              createdAt={user.createdAt}
            />
          }
        />
        <Route path="appearance" element={<AppearanceSubpage />} />
      </Routes>
    </Page>
  );
};
