import { API_ROUTES } from '@shared/api/rest/routes';
import { APIInterface } from '@shared/api/rest';
import type { User } from '@shared/types';

export const userQueries = {
  getMe: () => {
    return APIInterface.get<User>(API_ROUTES.USERS.GET_ME);
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    return APIInterface.patch(API_ROUTES.USERS.CHANGE_PASSWORD, { currentPassword, newPassword });
  },
  update: (data: Partial<User>) => {
    return APIInterface.patch<User>(API_ROUTES.USERS.UPDATE, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
