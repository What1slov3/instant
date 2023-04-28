import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import ModalDescription from '@layouts/Modals/ModalDescription';
import ModalHeader from '@layouts/Modals/ModalHeader';
import Tooltip from '@components/Tooltip/Tooltip';
import { TimeFormatter } from '@common/utils';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import { useModalControls } from '@common/hooks/useModalControls';
import { thunkDeleteMessage } from '@state/index';
import TEXTS from '@config/texts';
import type { DeleteMessageModalPayload } from '@customTypes/index';
import s from './deletemessagemodal.module.css';
import MessageAttachment from '@components/Attachments/MessageAttachment/MessageAttachment';

const DeleteMessageModal: React.FC<DeleteMessageModalPayload> = ({ message }): JSX.Element => {
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
          <div className={s.content}>{message.content.text}</div>
          {message.content.attachments && (
            <MessageAttachment attachments={message.content.attachments} canOpenModal={false} />
          )}
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

export default DeleteMessageModal;
