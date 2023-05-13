import { Input, InputTitleWithError, ModalSegment } from '@shared/ui';
import { config } from '@shared/config';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type Props = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
};

export const CreateChat: React.FC<Props> = ({ errors, register, setValue }): JSX.Element => {
  return (
    <ModalSegment>
      <InputTitleWithError errors={errors} name="name">
        Название чата
      </InputTitleWithError>
      <Input
        register={register}
        name="name"
        options={{
          required: 'Обязательно к заполнению',
          minLength: {
            value: config.MIN_CHAT_TITLE_LENGTH,
            message: 'Не менее 3 символов длиной',
          },
          maxLength: {
            value: config.MAX_CHAT_TITLE_LENGTH,
            message: 'Не более 32 символов длиной',
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue('name', e.currentTarget.value.replace(/\s+/g, '-').replace(/-+/g, '-'));
          },
        }}
      />
    </ModalSegment>
  );
};
