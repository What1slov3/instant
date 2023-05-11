import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { APIQueries } from '@shared/api/rest';
import { useModalControls } from '@shared/hooks';
import { TEXTS } from '@shared/config';
import { Input, InputTitleWithError, ModalButton, ModalHeader } from '@shared/ui';
import s from './changepassword.module.css';

export const ChangePasswordModal: React.FC = (): JSX.Element => {
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
        <InputTitleWithError name="currentPassword" errors={errors}>
          Текущий пароль
        </InputTitleWithError>
        <Input
          type="password"
          register={register}
          name="currentPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitleWithError name="newPassword" errors={errors}>
          Новый пароль
        </InputTitleWithError>
        <Input
          type="password"
          register={register}
          name="newPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitleWithError name="repeatPassword" errors={errors}>
          Повторите пароль
        </InputTitleWithError>
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
