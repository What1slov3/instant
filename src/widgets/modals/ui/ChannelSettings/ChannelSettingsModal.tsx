import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useModalControls, useUploadImage } from '@shared/hooks';
import { useAppSelector, thunkUpdateChannel } from '@shared/state';
import { getModifiedValues } from '@shared/utils/getModifiedValues';
import { ModalButton, ModalHeader } from '@shared/ui';
import { ChannelAppearanceSettings, ChannelBasicSettings } from '@features/channel/update-channel-settings';
import type { Channel } from '@shared/types';
import s from './channelsettingsmodal.module.css';

export const ChannelSettingsModal: React.FC = (): JSX.Element => {
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

  const connection = useAppSelector((state) => state.statuses.connection);
  const channels = useAppSelector((state) => state.channels.channels);

  const channel = channels.find((channel) => channel._id === connection.channelId)!;

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
          channelId: channel._id,
          data: dirtyData,
        })
      );
    }
    modalControls.close();
  };

  return (
    <div className="modal">
      <ModalHeader>
        Настройки «<span className={s.channelName}>{channel.name}</span>»
      </ModalHeader>
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
