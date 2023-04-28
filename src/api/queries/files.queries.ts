import { APIAccessor } from '@api/index';
import { API_ROUTES } from '@api/routes';

export const filesQueries = {
  upload: (files: File[]) => {
    return APIAccessor.post<{ url: string; name: string }[]>(API_ROUTES.FILES.UPLOAD, files, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
