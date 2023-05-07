import { ErrorMessage } from '@hookform/error-message';
import { Input, InputTitle, InputTitleError } from '@shared/ui';
import { CONSTANTS } from '@shared/config';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { User } from '@shared/types';
import s from './personaldataform.module.css';

type Props = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
} & Pick<User, 'tag'>;

export const PersonalDataForm: React.FC<Props> = ({ errors, register, tag }): JSX.Element => {
  return (
    <section>
      <h2>Личные данные</h2>
      <div className={s.formWrapper}>
        <div className={s.formBlock}>
          <InputTitle>
            Ваш никнейм
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => <InputTitleError>{message}</InputTitleError>}
            />
          </InputTitle>
          <div className="flex flexaic">
            <Input
              register={register}
              name="username"
              options={{
                required: 'Обязательно к заполнению',
                minLength: {
                  value: CONSTANTS.MIN_USERNAME_LENGTH,
                  message: 'Никнейм должен быть не менее 3 символов длиной',
                },
                maxLength: {
                  value: CONSTANTS.MAX_USERNAME_LENGTH,
                  message: 'Никнейм должен быть не более 32 символов длиной',
                },
              }}
            />
            <span className={s.userTag}>#{tag}</span>
          </div>
        </div>
        <div className={s.formBlock}>
          <InputTitle>
            Электронная почта
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <InputTitleError>{message}</InputTitleError>}
            />
          </InputTitle>
          <Input
            register={register}
            name="email"
            options={{
              required: 'Обязательно к заполнению',
              validate: {
                containAt: (value: string) => value.includes('@') || 'Невалидная почта',
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};
