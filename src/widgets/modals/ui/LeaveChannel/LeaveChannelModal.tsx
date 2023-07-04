import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ModalButton, ModalDescription, ModalHeader, ModalSegment } from '@shared/ui';
import { useModalControls } from '@shared/hooks';
import { TEXTS } from '@shared/config';
import { effects } from '@widgets/modals/model/effects';
import type { LeaveChannelPayload } from '@shared/types';
import s from './leavechannelmodal.module.css';

export const LeaveChannelModal: React.FC<LeaveChannelPayload> = ({ id }): JSX.Element => {
  const modalControl = useModalControls();
  const navigate = useNavigate();

  const leave = () => {
    effects.leaveChannel(id);
    modalControl.close();
    navigate('/channels');
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.LEAVE}</ModalHeader>
      <ModalDescription>{TEXTS.MODALS.DESCRIPTIONS.LEAVE}</ModalDescription>
      <ModalSegment></ModalSegment>
      <div className="flex flexjce gap10">
        <ModalButton className={s.cancelButton} onClick={modalControl.close}>
          Отмена
        </ModalButton>
        <ModalButton className={s.deleteButton} style={{ background: 'var(--error-500)' }} onClick={leave}>
          Покинуть
        </ModalButton>
      </div>
    </div>
  );
};
