import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import ImageUploader from '@components/ImageUploader/ImageUploader';
import { useModalControls, useUploadImage } from '@common/hooks';
import CONSTANTS from '@config/config';
import ModalHeader from '@layouts/Modals/ModalHeader';
import InputTitle from '@layouts/Input/InputTitle';
import Input from '@layouts/Input/Input';
import ModalSegmentTitle from '@layouts/Modals/ModaSegmentTitle';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import ModalSegment from '@layouts/Modals/ModalSegment';
import InputTitleError from '@layouts/Input/InputTitleError';
import { useAppSelector, thunkUpdateChannel } from '@state/index';
import { getModifiedValues } from '@common/utils/getModifiedValues';
import type { Channel } from '@customTypes/index';
import s from './channelsettingsmodal.module.css';

const ChannelSettingsModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const [iconFile, iconURL, handleUpload, handleDrop] = useUploadImage();
  const [bannerFile, bannerURL, handleUploadBanner, handleDropBanner] = useUploadImage();

  const connection = useAppSelector((state) => state.app.connection);
  const channels = useAppSelector((state) => state.channels.channels);

  const currentChannel = channels.find((channel) => channel._id === connection.channelId)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ defaultValues: { name: currentChannel.name } });

  const onSubmitHandler = (data: Partial<Channel>) => {
    let filesData: { banner?: File; icon?: File } = {};

    if (bannerURL && currentChannel.banner !== bannerURL) {
      filesData.banner = bannerFile!;
    }
    if (iconURL && currentChannel.icon !== iconURL) {
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
          channelId: currentChannel._id,
          data: dirtyData,
        })
      );
    }
    modalControls.close();
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>
        Настройки «<span className={s.channelName}>{currentChannel.name}</span>»
      </ModalHeader>
      <ModalSegment>
        <ModalSegmentTitle>Внешний вид</ModalSegmentTitle>
        <div className={s.mainSettings}>
          <div>
            <InputTitle>Иконка сервера</InputTitle>
            <ImageUploader src={iconURL || currentChannel.icon} handleDrop={handleDrop} handleUpload={handleUpload} />
          </div>
          <div>
            <InputTitle>Баннер сервера</InputTitle>
            <ImageUploader
              src={bannerURL || currentChannel.banner}
              handleDrop={handleDropBanner}
              handleUpload={handleUploadBanner}
              width={400}
              height={150}
            />
          </div>
        </div>
      </ModalSegment>
      <ModalSegment>
        <ModalSegmentTitle>Базовые настройки</ModalSegmentTitle>
        <div>
          <InputTitle>
            Название сервера
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
                value: CONSTANTS.MIN_CHANNEL_TITLE_LENGTH,
                message: 'Название должно быть не менее 3 символов длиной',
              },
              maxLength: {
                value: CONSTANTS.MAX_CHANNEL_TITLE_LENGTH,
                message: 'Название должно быть не более 32 символов длиной',
              },
            }}
          />
        </div>
      </ModalSegment>
      <div className="flex flexjce gap10">
        <ModalButton className={s.cancelButton} onClick={modalControls.close}>
          Отмена
        </ModalButton>
        <ModalButton
          style={{ background: 'var(--success-500)' }}
          onClick={handleSubmit(onSubmitHandler)}
          onEnter={handleSubmit(onSubmitHandler)}
        >
          Сохранить
        </ModalButton>
      </div>
    </div>
  );
};

export default ChannelSettingsModal;
