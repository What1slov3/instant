import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector, thunkGetMe } from '@shared/state';
import { SocketInstance } from '@shared/api/socket';
import { ModalRenderer } from './modals';
import { MainPage } from '@pages/MainPage';
import { EnvironmentPage } from '@pages/EnvironmentPage';
import { ChannelsPage } from '@pages/ChannelsPage';
import { SettingsPage } from '@pages/SettingsPage';
import { InvitePage } from '@pages/InvitePage';
import { SidePanel } from '@widgets/app';
import { SOCKET_EVENTS } from '@shared/api/socket/events';
import s from './styles/app.module.css';

function App() {
  const dispatch = useDispatch<any>();

  const user = useAppSelector((state) => state.user);
  const isInitated = useAppSelector((state) => state.statuses.initated);
  const connection = useAppSelector((state) => state.statuses.connection);
  const chats = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (connection.wsId && !isInitated) {
      dispatch(thunkGetMe());
    }
  }, [connection, isInitated]);

  useEffect(() => {
    SocketInstance.emit(SOCKET_EVENTS.CONNECT, {
      userId: user.id,
    });
  }, [user.id]);

  useEffect(() => {
    SocketInstance.emit(SOCKET_EVENTS.CHATS.JOIN, {
      userId: user.id,
      chats: Object.keys(chats),
    });
  }, [chats]);

  useEffect(() => {
    SocketInstance.emit(SOCKET_EVENTS.CONNECT, {
      userId: user.id,
    });
    SocketInstance.emit(SOCKET_EVENTS.CHATS.JOIN, {
      userId: user.id,
      chats: Object.keys(chats),
    });
  }, [connection.wsId]);

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
