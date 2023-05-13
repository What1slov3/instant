import { Input, InputTitleWithError, ModalSegment } from '@shared/ui';
import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

type Props = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
};

export const PasswordChange: React.FC<Props> = ({ errors, register, watch }): JSX.Element => {
  return (
    <ModalSegment className="flex flexcolumn gap10">
      <div>
        <InputTitleWithError name="currentPassword" errors={errors}>
          Текущий пароль
        </InputTitleWithError>
        <Input
          type="password"
          register={register}
          name="currentPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitleWithError name="newPassword" errors={errors}>
          Новый пароль
        </InputTitleWithError>
        <Input
          type="password"
          register={register}
          name="newPassword"
          options={{ required: 'Обязательно к заполнению' }}
        ></Input>
      </div>
      <div>
        <InputTitleWithError name="repeatPassword" errors={errors}>
          Повторите пароль
        </InputTitleWithError>
        <Input
          type="password"
          register={register}
          name="repeatPassword"
          options={{
            required: 'Обязательно к заполнению',
            validate: (value: string) => {
              if (watch('newPassword') !== value) {
                return 'Пароли не совпадают';
              }
            },
          }}
        ></Input>
      </div>
    </ModalSegment>
  );
};
