import classNames from 'classnames';
import { useModalControls } from '@common/hooks/useModalControls';
import type { ModalsWihtoutPayload } from '@customTypes/index';
import s from './channeldropdown.module.css';

type Props = {
  channelId: string;
};

const ChannelDropdown: React.FC<Props> = ({ channelId }): JSX.Element => {
  const modalControls = useModalControls();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    modalControls.openByDataset(e.currentTarget);
  };

  const handleOpenInvite = () => {
    modalControls.open({ name: 'channelInvite', payload: { channelId } });
  };

  return (
    <div className={classNames(s.wrapper)}>
      <div className={classNames(s.option, s.invite, 'flex flexjcsb flexaic')} onClick={handleOpenInvite}>
        Пригласить людей <i className="fa-solid fa-user-plus"></i>
      </div>
      <div
        className={classNames(s.option, 'flex flexjcsb flexaic')}
        onClick={handleOpenModal}
        data-modal={'channelSettings' as ModalsWihtoutPayload}
      >
        Настройки <i className="fa-solid fa-gear"></i>
      </div>
    </div>
  );
};

export default ChannelDropdown;
