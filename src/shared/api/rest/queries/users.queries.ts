import { API_ROUTES } from '@shared/api/rest/routes';
import { APIAccessor } from '@shared/api/rest';
import type { ID, User } from '@shared/types';

export const usersQueries = {
  getUsers: (userIds: ID | ID[]) => {
    return APIAccessor.get<Pick<User, '_id' | 'avatar' | 'tag' | 'username'>[]>(API_ROUTES.USERS.GET_USERS, {
      params: { ids: typeof userIds === 'string' ? userIds : userIds.join(',') },
    });
  },
};
