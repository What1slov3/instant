import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUploadImage } from '@shared/hooks';
import { ImageUploader } from '@shared/components';
import { ModalButton } from '@shared/ui';
import { UserProfile } from '@entities/user';
import { PersonalDataForm, UserSecurityForm } from '@features/settings/update-user-profile';
import { setUserLoadingStatus, thunkUpdateUserProfile } from '@shared/state';
import type { SliceUser } from '@shared/types';
import s from './profilesettingspage.module.css';

type Props = {} & Pick<SliceUser, 'username' | 'avatar' | 'tag' | 'email' | 'createdAt' | 'loadingStatus'>;

export const ProfileSettingsPage: React.FC<Props> = ({
  username,
  avatar,
  tag,
  email,
  createdAt,
  loadingStatus,
}): JSX.Element => {
  const dispatch = useDispatch<any>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: { username, email } });

  const { img: avatarFile, imgURL: avatarURL, handleUpload, handleDrop, reset: resetAvatar } = useUploadImage();

  useEffect(() => {
    if (loadingStatus.status === 'succeeded' && (isDirty || avatarURL)) {
      reset({});
      resetAvatar();
      dispatch(setUserLoadingStatus({ status: 'idle', error: null }));
    }
  }, [loadingStatus]);

  const onSubmitHandler = (data: any) => {
    if (avatarFile && avatar !== avatarURL) {
      data.avatar = avatarFile;
    }
    dispatch(thunkUpdateUserProfile(data));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <UserProfile
          avatarComponent={
            <ImageUploader src={avatarURL || avatar} handleDrop={handleDrop} handleUpload={handleUpload} height={120} />
          }
          username={username}
          tag={tag}
          createdAt={createdAt}
        />
        <PersonalDataForm errors={errors} register={register} tag={tag} />
        <UserSecurityForm />
      </div>
      {(isDirty || avatarURL) && (
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
