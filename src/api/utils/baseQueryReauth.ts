import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { API_BASE, API_ROUTES } from '@api/routes';
import { logout } from '..';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${localStorage.getItem('access')}`);
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(API_ROUTES.AUTH.REFRESH_TOKEN, api, extraOptions);
    if (refreshResult.data) {
      localStorage.setItem('access', (refreshResult.data as any).access);
      result = await baseQuery(args, api, extraOptions);
    } else {
      logout();
    }
  }
  return result;
};
