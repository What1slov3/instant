import { APIAccessor } from '@api/index';
import { API_ROUTES } from '@api/routes';

export const filesQueries = {
  upload: (files: File[]) => {
    const formData = new FormData();

    files.forEach((file) => formData.append('files[]', file));

    return APIAccessor.post<{ url: string; name: string }[]>(API_ROUTES.FILES.UPLOAD, formData);
  },
};
