import { API_ROUTES } from '@shared/api/rest/routes';
import { APIInterface } from '@shared/api/rest';

export const filesQueries = {
  upload: (files: File[]) => {
    return APIInterface.post<{ url: string; name: string }[]>(
      API_ROUTES.FILES.UPLOAD,
      { files },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  },
};
