import { UserListCard } from '@entities/user';
import { Permissions } from '@shared/libs';
import { ModerateUsersControls } from '../ModerateUsersControls/ModerateUsersControls';
import { UserEditControlsBlock } from '../UserEditControlsBlock/UserEditControlsBlock';
import type { ID, User } from '@shared/types';

type Props = {
  controls?: {
    element: JSX.Element;
    onHover?: boolean;
  };
  channelId: ID;
  isEditingOpen: boolean;
  setIsEditing: () => void;
} & Pick<User, 'id' | 'avatar' | 'tag' | 'username'>;

export const ModerateUserCard: React.FC<Props> = ({
  controls,
  channelId,
  isEditingOpen,
  setIsEditing,
  ...props
}): JSX.Element => {
  return (
    <UserListCard
      {...props}
      isActive={isEditingOpen}
      controls={{
        element: (
          <ModerateUsersControls
            channelId={channelId}
            userId={props.id}
            isCurrentUser={Permissions.checkIsCurrentUser(props.id)}
            setIsEditing={setIsEditing}
          />
        ),
      }}
      innerContent={<UserEditControlsBlock isOpen={isEditingOpen} />}
    />
  );
};
