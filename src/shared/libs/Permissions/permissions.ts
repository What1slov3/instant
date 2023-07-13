import { store } from '@shared/state';
import { EPermissions } from '@shared/types';
import type { ConnectionContext, ID } from '@shared/types';

function checkPermissions({
  requiredPermissions,
  context,
  contextId = null,
  mode = 'and',
}: {
  requiredPermissions: number | number[];
  context: ConnectionContext;
  contextId?: ID | null;
  mode?: 'and' | 'or';
}) {
  contextId = contextId || store.getState().statuses.connection[`${context}Id`];

  if (!contextId) {
    return false;
  }

  const reqiured = summarizePermissions(requiredPermissions);
  const user = summarizePermissions(store.getState().permissions[context][contextId]);

  if (!user || !reqiured) {
    return false;
  } else {
    if (mode === 'and') {
      return (user & reqiured) === requiredPermissions;
    } else {
      return Boolean(user & reqiured);
    }
  }
}

function checkPermissionsExist(context: ConnectionContext, contextId: ID) {
  return Boolean(store.getState().permissions[context][contextId]);
}

function checkIsCurrentUser(userId: ID) {
  return userId === store.getState().user.id;
}

function summarizePermissions(permissions: number | number[]) {
  if (Array.isArray(permissions)) {
    let summaryPermissions = 0;

    permissions.forEach((permission) => {
      summaryPermissions |= permission;
    });

    return summaryPermissions;
  }

  if (permissions >= 0 && Number.isSafeInteger(permissions)) {
    return permissions;
  }

  console.warn('Not valid permissions');
}

export const Permissions = {
  checkPermissions,
  checkPermissionsExist,
  checkIsCurrentUser,
};
