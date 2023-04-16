import { APIAccessor } from '@api/index';
import { API_ROUTES } from '@api/routes';
import type { ID, User } from '@customTypes/index';

export const usersQueries = {
  getUsers: (userIds: ID | ID[]) => {
    return APIAccessor.get<User[]>(API_ROUTES.USERS.GET_USERS, {
      params: { ids: typeof userIds === 'string' ? userIds : userIds.join(',') },
    });
  },
};
