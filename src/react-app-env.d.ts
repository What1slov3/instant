/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_HOST_URL: string;
    REACT_APP_API_URL: string;
    REACT_APP_ACCESS_TOKEN_LS_FIELD: string;
    REACT_APP_SIGNUP_PAGE_ROUTE: string;
    REACT_APP_WEBSOCKET_URL: string;
  }
}
