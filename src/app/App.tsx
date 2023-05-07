import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector, thunkGetMe } from '@shared/state';
import { ChannelsPage, EnvironmentPage, InvitePage, MainPage, SettingsPage } from '../pages';
import { SocketInstance } from '@shared/api/socket';
import { ModalRenderer } from './modals';
import SidePanel from '@widgets/app/ui/SidePanel/SidePanel';
import s from './styles/app.module.css';

function App() {
  const dispatch = useDispatch<any>();

  const user = useAppSelector((state) => state.user);
  const isInitated = useAppSelector((state) => state.statuses.initated);
  const connection = useAppSelector((state) => state.statuses.connection);
  const chats = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (connection.ws && !isInitated) {
      dispatch(thunkGetMe());
    }
  }, [connection, isInitated]);

  useEffect(() => {
    SocketInstance.emit('join', Object.keys(chats));
  }, [chats]);

  return (
    <>
      <ModalRenderer />
      <div className={s.app}>
        {isInitated && (
          <>
            <SidePanel user={user} />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/environment/*" element={<EnvironmentPage />} />
              <Route path="/channels/*" element={<ChannelsPage />} />
              <Route path="/settings/*" element={<SettingsPage user={user} />} />
              <Route path="/invites/*" element={<InvitePage />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;
