import { useModalControls } from '@shared/hooks';
import { IconButton } from '@shared/ui';
import type { ID } from '@shared/types';

type Props = {
  chatId: ID;
};

export const ChatControls: React.FC<Props> = ({ chatId }): JSX.Element => {
  const modalControls = useModalControls();

  const handleMemberListClick = () => {
    modalControls.open({ name: 'chatMembersList', payload: { chatId } });
  };

  return (
    <div className="flex flexaic gap10">
      <IconButton faClass="fa-solid fa-user-group" onClick={handleMemberListClick} />
    </div>
  );
};
