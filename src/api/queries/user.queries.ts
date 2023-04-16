import { APIAccessor } from '@api/index';
import { API_ROUTES } from '@api/routes';
import type { User } from '@customTypes/index';

export const userQueries = {
  getMe: () => {
    return APIAccessor.get<User>(API_ROUTES.USERS.GET_ME);
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    return APIAccessor.patch(API_ROUTES.USERS.CHANGE_PASSWORD, { currentPassword, newPassword });
  },
  update: (data: Partial<User>) => {
    return APIAccessor.patch<User>(API_ROUTES.USERS.UPDATE, data);
  },
};
