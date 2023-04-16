import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import SidePanel from '@components/SidePanel/SidePanel';
import ModalRenderer from '@containers/ModalRenderer/ModalRenderer';
import { thunkGetMe } from './state/user/thunk';
import { useAppSelector } from '@state/index';
import { ChannelsPage, EnvironmentPage, InvitePage, MainPage, SettingsPage } from './pages';
import { SocketInstance } from '@common/libs';
import './App.css';

function App() {
  const dispatch = useDispatch<any>();

  const user = useAppSelector((state) => state.user);
  const isInitated = useAppSelector((state) => state.app.initated);
  const connection = useAppSelector((state) => state.app.connection);
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
      <div className="app">
        {isInitated && (
          <>
            <SidePanel user={user} />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/environment/*" element={<EnvironmentPage />} />
              <Route path="/channels/*" element={<ChannelsPage />} />
              <Route path="/settings/*" element={<SettingsPage />} />
              <Route path="/invites/*" element={<InvitePage />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;
