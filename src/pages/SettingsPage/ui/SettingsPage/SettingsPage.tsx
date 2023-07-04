import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Page } from '@shared/ui';
import { SettingsNavbar } from '@features/settings/navigate-settings';
import { BasicAppearanceSettings } from '@features/settings/update-app-appearance';
import { ProfileSettingsPage } from '../ProfileSettingsPage/ProfileSettingsPage';
import type { SliceUser } from '@shared/types';
import s from './settingspage.module.css';

type Props = {
  user: SliceUser;
};

export const SettingsPage: React.FC<Props> = ({ user }): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('profile');
  }, []);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '10px' }} title="Instant | Настройки">
      <SettingsNavbar />
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
        <Route path="appearance" element={<BasicAppearanceSettings />} />
      </Routes>
    </Page>
  );
};
