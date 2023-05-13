import classNames from 'classnames';
import { ChannelDropdown } from '@entities/channel';
import { useModalControls } from '@shared/hooks';
import type { ID, ModalsWithoutPayload } from '@shared/types';
import s from './openchanneldropdown.module.css';

type Props = {
  channelId: ID;
};

export const OpenChannelDropdown: React.FC<Props> = ({ channelId }): JSX.Element => {
  const modalControls = useModalControls();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    modalControls.openByDataset(e.currentTarget);
  };

  const handleOpenInvite = () => {
    modalControls.open({ name: 'channelInvite', payload: { channelId } });
  };

  return (
    <ChannelDropdown channelId={channelId}>
      <div className={classNames(s.option, s.invite, 'flex flexjcsb flexaic')} onClick={handleOpenInvite}>
        Пригласить людей <i className="fa-solid fa-user-plus"></i>
      </div>
      <div
        className={classNames(s.option, 'flex flexjcsb flexaic')}
        onClick={handleOpenModal}
        data-modal={'channelSettings' as ModalsWithoutPayload}
      >
        Настройки <i className="fa-solid fa-gear"></i>
      </div>
    </ChannelDropdown>
  );
};
