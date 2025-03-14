import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Shortcut, LSA } from '@shared/libs/index';
import { store } from '@shared/state/index';
import App from './app/App';
import './index.css';

export const ShortcutInstance = new Shortcut();
export const LSAInstance = new LSA();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
