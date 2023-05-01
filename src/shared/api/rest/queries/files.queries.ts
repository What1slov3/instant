import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';

export const filesQueries = {
  upload: (files: File[]) => {
    return APIAccessor.post<{ url: string; name: string }[]>(
      API_ROUTES.FILES.UPLOAD,
      { files },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  },
};
