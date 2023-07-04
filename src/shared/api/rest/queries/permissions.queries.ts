import { APIAccessor } from '..';
import { API_ROUTES } from '../routes';
import type { ConnectionContext } from '@shared/types';

export const permissionsQueries = {
  get: (context: ConnectionContext, contextId: string) => {
    return APIAccessor.get<
      { userId: string } & { [key in ConnectionContext]: { contextId: string; permissions: number } }
    >(API_ROUTES.PERMISSIONS.GET, { params: { context, contextId } });
  },
};
