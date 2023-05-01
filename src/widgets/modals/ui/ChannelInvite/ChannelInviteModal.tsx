import { useRef } from 'react';
import classNames from 'classnames';
import { useModalControls } from '@shared/hooks';
import { invitesAPI } from '@shared/api/rest/services';
import { getRandom } from '@shared/utils';
import { TEXTS } from '@shared/config';
import { ModalButton, ModalDescription, ModalHeader } from '@shared/ui';
import type { ChannelInviteModalPayload } from '@shared/types';
import s from './channelinvitemodal.module.css';

export const ChannelInviteModal: React.FC<ChannelInviteModalPayload> = ({ channelId }): JSX.Element => {
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
