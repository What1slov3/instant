import { createApi } from '@reduxjs/toolkit/dist/query/react'; 
import { baseQueryWithReauth } from '@api/utils/baseQueryReauth';

export const commonAPI = createApi({
  reducerPath: 'commonAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
