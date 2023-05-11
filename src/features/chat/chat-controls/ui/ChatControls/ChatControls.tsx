import { useModalControls } from '@shared/hooks';
import { IconButton } from '@shared/ui';
import type { Connection } from '@shared/types';

type Props = {
  connection: Connection;
};

export const ChatControls: React.FC<Props> = ({ connection }): JSX.Element => {
  const modalControls = useModalControls();

  const handleMemberListClick = () => {
    modalControls.open({ name: 'chatMembersList', payload: { ...connection } });
  };

  return (
    <div className="flex flexaic gap10">
      <IconButton faClass="fa-solid fa-user-group" onClick={handleMemberListClick} />
    </div>
  );
};
