import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import InputTitle from '@layouts/Input/InputTitle';
import Input from '@layouts/Input/Input';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import ModalHeader from '@layouts/Modals/ModalHeader';
import InputTitleError from '@layouts/Input/InputTitleError';
import { APIQueries } from '@api/index';
import TEXTS from '@common/texts';
import { useModalControls } from '@common/hooks';
import s from './changepassword.module.css';

const ChangePasswordModal: React.FC = (): JSX.Element => {
  const modalControls = useModalControls();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const onSubmitHandler = (data: any) => {
    APIQueries.user
      .changePassword(data.currentPassword, data.newPassword)
      .then(() => modalControls.close())
      .catch((err) => setError('currentPassword', { type: 'custom', message: err.response.data.message }));
  };

  return (
    <div className={classNames(s.wrapper, 'modal flex flexcolumn gap15')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.UPDATE_PASSWORD}</ModalHeader>
      <div>
        <InputTitle>
          текущий пароль
          {
            <ErrorMessage
              errors={errors}
              name="currentPassword"
              render={({ message }) => <InputTitleError>{message}</InputTitleError>}
            />
          }
        </InputTitle>
        <Input
          type="password"
          register={register}
          name="currentPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitle>
          Новый пароль
          {
            <ErrorMessage
              errors={errors}
              name="newPassword"
              render={({ message }) => <InputTitleError>{message}</InputTitleError>}
            />
          }
        </InputTitle>
        <Input
          type="password"
          register={register}
          name="newPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitle>
          Повторите пароль
          {
            <ErrorMessage
              errors={errors}
              name="repeatPassword"
              render={({ message }) => <InputTitleError>{message}</InputTitleError>}
            />
          }
        </InputTitle>
        <Input
          type="password"
          register={register}
          name="repeatPassword"
          options={{
            required: 'Обязательно к заполнению',
            validate: (value: string) => {
              if (watch('newPassword') != value) {
                return 'Пароли не совпадают';
              }
            },
          }}
        ></Input>
      </div>
      <ModalButton onClick={handleSubmit(onSubmitHandler)}>Сохранить</ModalButton>
    </div>
  );
};

export default ChangePasswordModal;
