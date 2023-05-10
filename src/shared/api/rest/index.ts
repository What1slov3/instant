import axios, { AxiosInstance } from 'axios';
import { API_ROUTES, API_BASE } from '@shared/api/rest/routes';
import {
  filesQueries,
  channelsQueries,
  chatsQueries,
  messagesQueries,
  userQueries,
  usersQueries,
  invitesQueries,
} from '@shared/api/rest/queries';

export function logout() {
  fetch(`${API_BASE}${API_ROUTES.AUTH.LOGOUT}`).then((res) => {
    if (res.status === 200) {
      window.location.replace(`${process.env.REACT_APP_HOST_URL}${process.env.REACT_APP_SIGNUP_PAGE_ROUTE}`);
    }
  });
}

export class API {
  private _APIAccessor: AxiosInstance;
  private _accessToken: string = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_LS_FIELD) || '';

  constructor() {
    this._APIAccessor = axios.create({
      baseURL: API_BASE,
      withCredentials: true,
    });

    this._APIAccessor.interceptors.request.use(
      async (config) => {
        config.headers.setAuthorization(`Bearer ${this._accessToken}`);
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
          localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_LS_FIELD, this._accessToken);
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
  files: filesQueries,
  invites: invitesQueries,
};
