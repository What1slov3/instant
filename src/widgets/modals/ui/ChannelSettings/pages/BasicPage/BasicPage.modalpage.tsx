import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useModalControls, useUploadImage } from '@shared/hooks';
import { getModifiedValues } from '@shared/utils';
import { thunkUpdateChannel } from '@shared/state';
import { ChannelAppearanceSettings, ChannelBasicSettings } from '@features/channel/update-channel-settings';
import { ModalButton } from '@shared/ui';
import type { Channel } from '@shared/types';
import s from './basicpage.module.css';

type Props = {
  channel: Channel;
};

export const BasicPage: React.FC<Props> = ({ channel }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const {
    img: iconFile,
    imgURL: iconURL,
    handleUpload: iconHandleUpload,
    handleDrop: iconHandleDrop,
  } = useUploadImage();
  const {
    img: bannerFile,
    imgURL: bannerURL,
    handleUpload: bannerHandleUpload,
    handleDrop: bannerHandleDrop,
  } = useUploadImage();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ defaultValues: { name: channel.name } });

  const onSubmitHandler = (data: Partial<Channel>) => {
    let filesData: { banner?: File; icon?: File } = {};

    if (bannerURL && channel.banner !== bannerURL) {
      filesData.banner = bannerFile!;
    }
    if (iconURL && channel.icon !== iconURL) {
      filesData.icon = iconFile!;
    }

    if (isDirty || filesData.icon || filesData.banner) {
      const dirtyData = {
        ...filesData,
        ...getModifiedValues<Partial<Omit<Channel, 'banner' | 'icon'>>>(dirtyFields, data),
      };

      console.log(dirtyData);
      dispatch(
        thunkUpdateChannel({
          channelId: channel.id,
          data: dirtyData,
        })
      );
    }

    modalControls.close();
  };

  return (
    <div className='flex flexcolumn'>
      <ChannelAppearanceSettings
        iconHandleDrop={iconHandleDrop}
        iconHandleUpload={iconHandleUpload}
        bannerHandleDrop={bannerHandleDrop}
        bannerHandleUpload={bannerHandleUpload}
        currentIconURL={channel.icon}
        currentBannerURL={channel.banner}
        iconURL={iconURL}
        bannerURL={bannerURL}
      />
      <ChannelBasicSettings errors={errors} register={register} />
      <div className={classNames(s.buttons, 'flex flexjce gap10')}>
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
