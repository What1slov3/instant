import { APIInterface } from '..';
import { API_ROUTES } from '../routes';
import type { EPermissionsContext, User } from '@shared/types';

export const permissionsQueries = {
  get: async (context: EPermissionsContext, contextId: string) => {
    const result = await APIInterface.get<{
      userId: User['id'];
      contextId: string;
      rule: number;
      context: EPermissionsContext;
    }>(API_ROUTES.PERMISSIONS.GET, {
      params: { context, contextId },
    });

    const resultDataWithContext = {
      ...result.data,
      context,
    };

    result.data = resultDataWithContext;

    return result;
  },
};
