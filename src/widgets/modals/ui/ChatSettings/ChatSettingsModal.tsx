import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ModalButton, ModalHeader } from '@shared/ui';
import { TEXTS } from '@shared/config';
import { UpdateChatSettings } from '@features/chat/update-chat-settings';
import { thunkUpdateChat, useAppSelector } from '@shared/state';
import { useModalControls } from '@shared/hooks';
import type { Chat, ChatSettingsPayload } from '@shared/types';
import s from './chatsettingsmodal.module.css';

export const ChatSettingsModal: React.FC<ChatSettingsPayload> = ({ chatId }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const chat = useAppSelector((state) => state.chats[chatId!]);

  const {
    register,
    setValue,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({ defaultValues: { name: chat.name } });

  const onSubmitHandler = (data: Partial<Chat>) => {
    if (isDirty) {
      dispatch(thunkUpdateChat({ chatId: chatId!, data }));
      modalControls.close();
    }
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.CHAT_SETTINGS}</ModalHeader>
      <UpdateChatSettings register={register} setValue={setValue} errors={errors} />
      <div className="flex flexjce gap10">
        <ModalButton className={s.cancelButton} onClick={modalControls.close}>
          Отмена
        </ModalButton>
        <ModalButton
          className="mainGradient"
          onClick={handleSubmit(onSubmitHandler)}
          onEnter={handleSubmit(onSubmitHandler)}
        >
          Сохранить
        </ModalButton>
      </div>
    </div>
  );
};
