import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { Permissions } from '@shared/libs';
import { IconButton } from '@shared/ui';
import { EPermissions, EPermissionsContext, type ID } from '@shared/types';
import s from './messagetoolbar.module.css';

type Props = {
  senderId: ID;
  ownerClass: string;
};

export const MessageToolbar: React.FC<Props> = ({ senderId, ownerClass }): JSX.Element => {
  return (
    <div className={classNames(s.contextMenu, ownerClass)}>
      <Tooltip position="top" positioning="absolute" text="Копировать">
        <IconButton faClass="fa-regular fa-clone" className={s.contextButton} data-message-action="copy" />
      </Tooltip>
      {(Permissions.checkIsCurrentUser(senderId) ||
        Permissions.checkPermissions({
          context: EPermissionsContext.CHANNEL,
          requiredPermissions: [EPermissions['ADMIN'], EPermissions['OWNER']],
          mode: 'or',
        })) && (
        <Tooltip position="top" positioning="absolute" text="Удалить">
          <IconButton
            faClass="fa-solid fa-trash-can"
            className={classNames(s.delete, s.contextButton)}
            data-message-action="delete"
          />
        </Tooltip>
      )}
      {Permissions.checkIsCurrentUser(senderId) && (
        <Tooltip position="top" positioning="absolute" text="Редактировать">
          <IconButton
            faClass="fa-solid fa-pencil"
            className={classNames(s.contextButton)}
            data-message-action="edit"
          />
        </Tooltip>
      )}
    </div>
  );
};
