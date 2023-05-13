import { Input, InputTitleWithError, ModalSegment, ModalSegmentTitle } from '@shared/ui';
import { config } from '@shared/config';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
};

export const ChannelBasicSettings: React.FC<Props> = ({ errors, register }): JSX.Element => {
  return (
    <ModalSegment>
      <ModalSegmentTitle>Базовые настройки</ModalSegmentTitle>
      <div>
        <InputTitleWithError name="name" errors={errors}>
          Название сервера
        </InputTitleWithError>
        <Input
          register={register}
          name="name"
          options={{
            required: 'Обязательно к заполнению',
            minLength: {
              value: config.MIN_CHANNEL_TITLE_LENGTH,
              message: 'Не менее 3 символов длиной',
            },
            maxLength: {
              value: config.MAX_CHANNEL_TITLE_LENGTH,
              message: 'Не более 32 символов длиной',
            },
          }}
        />
      </div>
    </ModalSegment>
  );
};
