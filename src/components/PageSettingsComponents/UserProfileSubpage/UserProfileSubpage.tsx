import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { thunkUpdateUser } from '@state/index';
import { useModalControls, useUploadImage } from '@common/hooks';
import CONSTANTS from '@common/constants';
import Input from '@layouts/Input/Input';
import InputTitle from '@layouts/Input/InputTitle';
import ImageUploader from '@components/ImageUploader/ImageUploader';
import StyledButton from '@layouts/Buttons/StyledButton/StyledButton';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import InputTitleError from '@layouts/Input/InputTitleError';
import type { User } from '@customTypes/index';
import s from './userprofilesubpage.module.css';

type Props = {} & Pick<User, 'username' | 'avatar' | 'tag' | 'email' | 'createdAt'>;

const UserProfileSubpage: React.FC<Props> = ({ username, avatar, tag, email, createdAt }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: { username, email } });

  const [avatarFile, avatarURL, handleUpload, handleDrop] = useUploadImage();

  useEffect(() => {
    reset({});
  }, [username, email]);

  const onSubmitHandler = (data: any) => {
    if (avatarFile && avatar !== avatarURL) {
      data.avatar = avatarFile;
    }
    dispatch(thunkUpdateUser(data));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.userInfoWrapper}>
          <ImageUploader src={avatarURL || avatar} handleDrop={handleDrop} handleUpload={handleUpload} height={120} />
          <div className={s.info}>
            <div className={s.username}>
              {username}
              <span>#{tag}</span>
            </div>
            <div className={s.registerDate}>
              В Instant с <span>{new Date(createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>
        <section>
          <h2>Личные данные</h2>
          <div className={s.infoChanger}>
            <div className={s.infoChangerBlock}>
              <InputTitle>
                Ваш никнейм
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => <InputTitleError>{message}</InputTitleError>}
                />
              </InputTitle>
              <div className="flex flexaic">
                <Input
                  register={register}
                  name="username"
                  options={{
                    required: 'Обязательно к заполнению',
                    minLength: {
                      value: CONSTANTS.MIN_USERNAME_LENGTH,
                      message: 'Никнейм должен быть не менее 3 символов длиной',
                    },
                    maxLength: {
                      value: CONSTANTS.MAX_USERNAME_LENGTH,
                      message: 'Никнейм должен быть не более 32 символов длиной',
                    },
                  }}
                />
                <span className={s.userTag}>#{tag}</span>
              </div>
            </div>
            <div className={s.infoChangerBlock}>
              <InputTitle>
                Электронная почта
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <InputTitleError>{message}</InputTitleError>}
                />
              </InputTitle>
              <Input
                register={register}
                name="email"
                options={{
                  required: 'Обязательно к заполнению',
                  validate: {
                    containAt: (value: string) => value.includes('@') || 'Невалидная почта',
                  },
                }}
              />
            </div>
          </div>
        </section>
        <section>
          <h2>Безопасность</h2>
          <StyledButton onClick={() => modalControls.open({ name: 'changePassword' })}>Изменить пароль</StyledButton>
        </section>
      </div>
      {isDirty && (
        <ModalButton
          className={s.saveButtonWrapper}
          style={{ background: 'var(--success-500)' }}
          onClick={handleSubmit(onSubmitHandler)}
          onEnter={handleSubmit(onSubmitHandler)}
        >
          Сохранить
        </ModalButton>
      )}
    </div>
  );
};

export default UserProfileSubpage;
