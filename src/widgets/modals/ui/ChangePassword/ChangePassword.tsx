import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { APIQueries } from '@shared/api/rest';
import { useModalControls } from '@shared/hooks';
import { TEXTS } from '@shared/config';
import { PasswordChange } from '@features/settings/update-user-profile';
import { ModalButton, ModalHeader } from '@shared/ui';
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
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.UPDATE_PASSWORD}</ModalHeader>
      <PasswordChange register={register} watch={watch} errors={errors} />
      <ModalButton onClick={handleSubmit(onSubmitHandler)}>Сохранить</ModalButton>
    </div>
  );
};
