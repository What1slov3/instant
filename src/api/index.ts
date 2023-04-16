import axios, { AxiosInstance } from 'axios';
import { API_ROUTES, API_BASE } from './routes';
import { parseJwt } from '@common/utils';
import { channelsQueries, chatsQueries, messagesQueries, userQueries, usersQueries } from './queries';

export function logout() {
  localStorage.removeItem('user');
  fetch(`${API_BASE}/auth/logout`).then((res) => {
    if (res.status === 200) {
      window.location.replace('http://localhost:3000/signup.html');
    }
  });
}

export class API {
  private _APIAccessor: AxiosInstance;
  private _accessToken: string = localStorage.getItem('access') || '';

  constructor() {
    this._APIAccessor = axios.create({
      baseURL: API_BASE,
      withCredentials: true,
    });

    this._APIAccessor.interceptors.request.use(
      async (config) => {
        config.headers = { Authorization: `Bearer ${this._accessToken}` };
        return config;
      },
      (err) => Promise.reject(err)
    );

    this._APIAccessor.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          this._accessToken = await this.refresh();
          localStorage.setItem('access', `Bearer ${this._accessToken}`);
          axios.defaults.headers.common['Authorization'] = `Bearer ${this._accessToken}`;

          return this._APIAccessor(originalRequest);
        }

        return Promise.reject(err);
      }
    );
  }

  private refresh() {
    return fetch(`${API_BASE}${API_ROUTES.AUTH.REFRESH_TOKEN}`, { credentials: 'include' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error();
      })
      .then((data) => {
        return data.access;
      })
      .catch(() => {
        logout();
      }) as Promise<string>;
  }

  public isAccessTokenExists() {
    return Boolean(this._accessToken);
  }

  public APIAccessor() {
    return this._APIAccessor;
  }
}

export const APIInstance = new API();
export const APIAccessor = APIInstance.APIAccessor();
export const APIQueries = {
  user: userQueries,
  channels: channelsQueries,
  chats: chatsQueries,
  messages: messagesQueries,
  users: usersQueries,
};
