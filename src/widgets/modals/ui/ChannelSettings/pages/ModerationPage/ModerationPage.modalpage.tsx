import { ModerateChannelUsers } from '@features/channel/moderate-channel-users';
import { ModalDescription } from '@shared/ui';
import type { Channel, User } from '@shared/types';
import s from './moderationpage.module.css';

type Props = {
  channel: Channel;
  user: User;
};

export const ModerationPage: React.FC<Props> = ({ channel, user }): JSX.Element => {
  return (
    <div className="flex flexcolumn gap10">
      <h3>Участники сервера</h3>
      <ModalDescription>Количество участников — {channel.members.length}</ModalDescription>
      <ModerateChannelUsers channel={channel} user={user} />
    </div>
  );
};
