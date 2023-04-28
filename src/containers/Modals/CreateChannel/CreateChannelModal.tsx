import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import Input from '@layouts/Input/Input';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import { thunkCreateChannel } from '@state/index';
import ModalHeader from '@layouts/Modals/ModalHeader';
import ModalDescription from '@layouts/Modals/ModalDescription';
import CONSTANTS from '@config/config';
import TEXTS from '@config/texts';
import { useInput, useUploadImage, useModalControls } from '@common/hooks';
import { toMB } from '@common/utils';
import ImageUploader from '@components/ImageUploader/ImageUploader';
import InputTitle from '@layouts/Input/InputTitle';
import LineError from '@layouts/Line/LineError';
import s from './createchannelmodal.module.css';

const CreateChannelModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const { value, onChange } = useInput({
    initial: '',
    setter: (value: string) => {
      setError(null);
      return value;
    },
  });

  const [icon, iconURL, handleUpload, handleDrop, iconError] = useUploadImage();

  const [error, setError] = useState<null | string>(null);

  const handleCreateChannel = () => {
    if (!value.trim()) {
      return setError('У канала должно быть название');
    }
    if (value.length > CONSTANTS.MAX_CHANNEL_TITLE_LENGTH) {
      return setError('Слишком длинное название');
    }
    if (!icon) {
      return setError('Загрузите иконку канала');
    }
    dispatch(thunkCreateChannel({ name: value, icon }));
    modalControls.close();
  };

  return (
    <div className={classNames(s.wrapper, 'modal')}>
      <ModalHeader>{TEXTS.MODALS.HEADERS.CREATE_CHANNEL}</ModalHeader>
      <ModalDescription>{TEXTS.MODALS.DESCRIPTIONS.CREATE_CHANNEL}</ModalDescription>
      <div className={classNames(s.uploader, 'flex gap10')}>
        <ImageUploader src={iconURL} handleDrop={handleDrop} handleUpload={handleUpload} />
        {icon && iconURL && (
          <div className={s.iconInfo}>
            <div>
              Размер: <span>{toMB(icon.size)}МБ</span>
            </div>
            <div>
              Название: <span>{icon.name}</span>
            </div>
          </div>
        )}
      </div>
      <InputTitle>Название канала</InputTitle>
      <Input className={s.channelNameInput} value={value} onChange={onChange} />
      {error && <LineError>{error}</LineError>}
      <div className="flex flexjce gap10">
        <ModalButton onClick={modalControls.close}>Отмена</ModalButton>
        <ModalButton style={{ background: 'var(--purple-600)' }} onClick={handleCreateChannel}>
          Готово
        </ModalButton>
      </div>
    </div>
  );
};

export default CreateChannelModal;
