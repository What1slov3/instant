import { store } from '@shared/state';
import { EPermissions } from '@shared/types';
import type { ConnectionContext, ID } from '@shared/types';

function checkPermissions(context: ConnectionContext, contextId: ID, requiredPermissions: number | number[]) {
  const reqiured = summarizePermissions(requiredPermissions);
  const user = summarizePermissions(store.getState().permissions[context][contextId]);

  if (!user || !reqiured) {
    return false;
  } else {
    return (user & reqiured) === requiredPermissions;
  }
}

function checkPermissionsExist(context: ConnectionContext, contextId: ID) {
  return Boolean(store.getState().permissions[context][contextId]);
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
};
