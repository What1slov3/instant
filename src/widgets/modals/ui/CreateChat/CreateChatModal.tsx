import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TEXTS } from '@shared/config';
import { useModalControls } from '@shared/hooks';
import { thunkCreateChat } from '@shared/state';
import { ModalButton, ModalDescription, ModalHeader } from '@shared/ui';
import { CreateChat } from '@features/chat/create-chat';
import type { CreateChatModalPayload } from '@shared/types';
import s from './createchatmodal.module.css';

type Props = CreateChatModalPayload;

export const CreateChatModal: React.FC<Props> = ({ chatGroup, channelId }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitHandler = (data: any) => {
    dispatch(thunkCreateChat({ name: data.name, chatGroupId: chatGroup.id, owningChannelId: channelId }));
    modalControls.close();
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.CREATE_CHAT}</ModalHeader>
      <ModalDescription>
        {TEXTS.MODALS.DESCRIPTIONS.CREATE_CHAT}
        <span className={s.chatGroupName}>{` «${chatGroup.name}»`}</span>
      </ModalDescription>
      <CreateChat errors={errors} register={register} setValue={setValue} />
      <div className="flex flexjce gap10">
        <ModalButton onClick={modalControls.close}>Отмена</ModalButton>
        <ModalButton
          className="mainGradient"
          onClick={handleSubmit(onSubmitHandler)}
          onEnter={handleSubmit(onSubmitHandler)}
        >
          Создать
        </ModalButton>
      </div>
    </div>
  );
};
