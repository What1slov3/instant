import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TEXTS from '@common/texts';
import { useModalControls } from '@common/hooks';
import CONSTANTS from '@common/constants';
import ModalHeader from '@layouts/Modals/ModalHeader';
import InputTitle from '@layouts/Input/InputTitle';
import Input from '@layouts/Input/Input';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import InputTitleError from '@layouts/Input/InputTitleError';
import ModalDescription from '@layouts/Modals/ModalDescription';
import { thunkCreateChat } from '@state/index';
import type { CreateChatModalPayload } from '@customTypes/index';
import s from './createchatmodal.module.css';

type Props = CreateChatModalPayload;

const CreateChatModal: React.FC<Props> = ({ chatGroup, channelId }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitHandler = (data: any) => {
    dispatch(thunkCreateChat({ name: data.name, chatGroupId: chatGroup._id, owningChannelId: channelId }));
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.CREATE_CHAT}</ModalHeader>
      <ModalDescription>
        {TEXTS.MODALS.DESCRIPTIONS.CREATE_CHAT}
        <span className={s.chatGroupName}>{` «${chatGroup.name}»`}</span>
      </ModalDescription>
      <InputTitle>
        Название чата
        {
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <InputTitleError>{message}</InputTitleError>}
          />
        }
      </InputTitle>
      <Input
        register={register}
        name="name"
        options={{
          required: 'Обязательно к заполнению',
          minLength: {
            value: CONSTANTS.MIN_CHAT_TITLE_LENGTH,
            message: 'Название должно быть не менее 3 символов длиной',
          },
          maxLength: {
            value: CONSTANTS.MAX_CHAT_TITLE_LENGTH,
            message: 'Название должно быть не более 32 символов длиной',
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue('name', e.currentTarget.value.replace(/\s+/g, '-').replace(/-+/g, '-'));
          },
        }}
      />
      <div className="flex flexjce gap10">
        <ModalButton onClick={modalControls.close}>Отмена</ModalButton>
        <ModalButton
          style={{ background: 'var(--success-500)' }}
          onClick={handleSubmit(onSubmitHandler)}
          onEnter={handleSubmit(onSubmitHandler)}
        >
          Создать
        </ModalButton>
      </div>
    </div>
  );
};

export default CreateChatModal;
