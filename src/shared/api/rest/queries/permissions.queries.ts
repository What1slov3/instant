import { APIInterface } from '..';
import { API_ROUTES } from '../routes';
import type { ConnectionContext, User } from '@shared/types';

export const permissionsQueries = {
  get: (context: ConnectionContext, contextId: string) => {
    return APIInterface.get<
      { userId: User['id'] } & { [key in ConnectionContext]: { contextId: string; permissions: number } }
    >(API_ROUTES.PERMISSIONS.GET, { params: { context, contextId } });
  },
};
