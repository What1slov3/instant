import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useInput, useUploadImage, useModalControls } from '@shared/hooks';
import { toMB } from '@shared/utils';
import { config, TEXTS } from '@shared/config';
import { thunkCreateChannel } from '@shared/state';
import { Input, InputTitle, LineError, ModalButton, ModalDescription, ModalHeader } from '@shared/ui';
import { ImageUploader } from '@shared/components';
import s from './createchannelmodal.module.css';

export const CreateChannelModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const { value, onChange } = useInput({
    initial: '',
    setter: (value: string) => {
      setError(null);
      return value;
    },
  });

  const { img: icon, imgURL: iconURL, handleUpload, handleDrop } = useUploadImage();

  const [error, setError] = useState<null | string>(null);

  const handleCreateChannel = () => {
    if (!value.trim()) {
      return setError('У канала должно быть название');
    }
    if (value.length > config.MAX_CHANNEL_TITLE_LENGTH) {
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
        <ModalButton className="mainGradient" onClick={handleCreateChannel}>
          Готово
        </ModalButton>
      </div>
    </div>
  );
};
