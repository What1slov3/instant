import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TimeFormatter } from '@shared/utils';
import { useModalControls } from '@shared/hooks/useModalControls';
import { thunkDeleteMessage } from '@shared/state';
import { TEXTS } from '@shared/config';
import { MessageAttachment } from '@entities/message';
import { ModalButton, ModalDescription, ModalHeader } from '@shared/ui';
import { Tooltip } from '@shared/components';
import type { DeleteMessageModalPayload } from '@shared/types';
import s from './deletemessagemodal.module.css';

export const DeleteMessageModal: React.FC<DeleteMessageModalPayload> = ({ message }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControl = useModalControls();

  const handleDeleteMessage = () => {
    dispatch(thunkDeleteMessage({ _id: message._id, context: message.context }));
    modalControl.close();
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.DELETE_MESSAGE}</ModalHeader>
      <ModalDescription>{TEXTS.MODALS.DESCRIPTIONS.DELETE_MESSAGE}</ModalDescription>
      <div className={classNames(s.message)}>
        <Tooltip
          positioning="absolute"
          text={new TimeFormatter(message.createdAt).getFullMessageTime()}
          className={s.timestampWrapper}
        >
          <div className={s.timestamp}>{new TimeFormatter(message.createdAt).getMessageTimeShort()}</div>
        </Tooltip>
        <div className={s.inner}>
          <div className={s.ownerName}>What1slov3</div>
          <div className={s.content}>
            {message.content.text}
            {message.content.attachments && (
              <MessageAttachment attachments={message.content.attachments} canOpenModal={false} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flexjce gap10">
        <ModalButton className={s.cancelButton} onClick={modalControl.close}>
          Отмена
        </ModalButton>
        <ModalButton className={s.deleteButton} onClick={handleDeleteMessage}>
          Удалить
        </ModalButton>
      </div>
    </div>
  );
};
