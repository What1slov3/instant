import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils';

export const commonAPI = createApi({
  reducerPath: 'commonAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
