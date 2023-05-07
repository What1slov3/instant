import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';
import type { User } from '@shared/types';

export const userQueries = {
  getMe: () => {
    return APIAccessor.get<User>(API_ROUTES.USERS.GET_ME);
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    return APIAccessor.patch(API_ROUTES.USERS.CHANGE_PASSWORD, { currentPassword, newPassword });
  },
  update: (data: Partial<User>) => {
    return APIAccessor.patch<User>(API_ROUTES.USERS.UPDATE, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
