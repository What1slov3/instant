import { useRef } from 'react';
import classNames from 'classnames';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import ModalHeader from '@layouts/Modals/ModalHeader';
import ModalDescription from '@layouts/Modals/ModalDescription';
import { getRandom } from '@common/utils';
import TEXTS from '@common/texts';
import { invitesAPI } from '@api/services';
import type { ChannelInviteModalPayload } from '@customTypes/index';
import s from './channelinvitemodal.module.css';
import { useModalControls } from '@common/hooks/useModalControls';

const ChannelInviteModal: React.FC<ChannelInviteModalPayload> = ({ channelId }): JSX.Element => {
  const modalControls = useModalControls();

  const { data, isLoading, isSuccess } = invitesAPI.useGetChannelInviteQuery(channelId);

  const headerTitle = useRef(getRandom(TEXTS.MODALS.HEADERS.INVITE));

  const handleCopy = () => {
    if (isSuccess) {
      navigator.clipboard.writeText(data.link);
      modalControls.close();
    }
  };

  const selectInvite = (e: React.MouseEvent<HTMLDivElement>) => {
    if (data) {
      const range = new Range();
      range.setStart(e.currentTarget, 0);
      range.setEnd(e.currentTarget, 1);
      document.getSelection()?.addRange(range);
    }
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{headerTitle.current}</ModalHeader>
      <ModalDescription>Ссылка будет действовать до пересоздания</ModalDescription>
      <div className={s.link} onClick={selectInvite}>
        {isLoading ? 'Загружаем...' : data?.link}
      </div>
      <div className="flex flexjce gap10">
        <ModalButton onClick={() => {}}>Обновить</ModalButton>
        <ModalButton style={{ background: 'var(--purple-500)' }} onClick={handleCopy}>
          Копировать
        </ModalButton>
      </div>
    </div>
  );
};

export default ChannelInviteModal;
