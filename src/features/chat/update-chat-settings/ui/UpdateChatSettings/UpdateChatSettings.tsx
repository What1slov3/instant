import { Input, InputTitleWithError, ModalSegment } from '@shared/ui';
import { CONSTANTS } from '@shared/config';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
};

export const UpdateChatSettings: React.FC<Props> = ({ register, errors, setValue }): JSX.Element => {
  return (
    <ModalSegment>
      <InputTitleWithError name="name" errors={errors}>
        Название чата
      </InputTitleWithError>
      <Input
        register={register}
        name="name"
        options={{
          required: 'Обязательно к заполнению',
          minLength: {
            value: CONSTANTS.MIN_CHAT_TITLE_LENGTH,
            message: 'Название должно быть не менее 3 символов длиной',
          },
          maxLength: {
            value: CONSTANTS.MAX_CHAT_TITLE_LENGTH,
            message: 'Название должно быть не более 32 символов длиной',
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue('name', e.currentTarget.value.replace(/\s+/g, '-').replace(/-+/g, '-'));
          },
        }}
      />
    </ModalSegment>
  );
};
