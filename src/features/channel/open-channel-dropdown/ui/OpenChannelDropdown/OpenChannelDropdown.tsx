import classNames from 'classnames';
import { ChannelDropdown } from '@entities/channel';
import { useModalControls } from '@shared/hooks';
import { Permissions } from '@shared/libs';
import { EPermissions } from '@shared/types';
import type { ModalsWithoutPayload, ID } from '@shared/types';
import s from './openchanneldropdown.module.css';

type Props = {
  channelId: ID;
  isOwner: boolean;
};

export const OpenChannelDropdown: React.FC<Props> = ({ channelId, isOwner }): JSX.Element => {
  const modalControls = useModalControls();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    modalControls.openByDataset(e.currentTarget);
  };

  const handleOpenInvite = () => {
    modalControls.open({ name: 'channelInvite', payload: { channelId } });
  };

  const handleOpenLeave = () => {
    modalControls.open({ name: 'leaveChannel', payload: { id: channelId } });
  };

  return (
    <ChannelDropdown channelId={channelId}>
      <button className={classNames(s.option, s.invite, 'flex flexjcsb flexaic')} onClick={handleOpenInvite}>
        Пригласить людей <i className="fa-solid fa-user-plus"></i>
      </button>
      {Permissions.checkPermissions({ context: 'channel', requiredPermissions: EPermissions['OWNER'] }) && (
        <button
          className={classNames(s.option, 'flex flexjcsb flexaic')}
          onClick={handleOpenModal}
          data-modal={'channelSettings' as ModalsWithoutPayload}
        >
          Настройки <i className="fa-solid fa-gear"></i>
        </button>
      )}
      {!isOwner && (
        <button className={classNames(s.option, s.leave, 'flex flexjcsb flexaic')} onClick={handleOpenLeave}>
          Покинуть <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      )}
    </ChannelDropdown>
  );
};
