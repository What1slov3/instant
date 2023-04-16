import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SettingsSidebar from '@components/PageSettingsComponents/SettingsSidebar/SettingsSidebar';
import UserProfileSubpage from '@components/PageSettingsComponents/UserProfileSubpage/UserProfileSubpage';
import AppearanceSubpage from '@components/PageSettingsComponents/AppearanceSubpage/AppearanceSubpage';
import { useAppSelector } from '@state/index';
import Page from '@layouts/Page/Page';
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
