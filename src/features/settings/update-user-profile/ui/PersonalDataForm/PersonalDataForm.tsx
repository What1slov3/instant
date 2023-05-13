import { Input, InputTitleWithError } from '@shared/ui';
import { config } from '@shared/config';
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
          <InputTitleWithError name="username" errors={errors}>
            Ваш никнейм
          </InputTitleWithError>
          <div className="flex flexaic">
            <Input
              register={register}
              name="username"
              options={{
                required: 'Обязательно к заполнению',
                minLength: {
                  value: config.MIN_USERNAME_LENGTH,
                  message: 'Не менее 3 символов длиной',
                },
                maxLength: {
                  value: config.MAX_USERNAME_LENGTH,
                  message: 'Не более 32 символов длиной',
                },
              }}
            />
            <span className={s.userTag}>#{tag}</span>
          </div>
        </div>
        <div className={s.formBlock}>
          <InputTitleWithError name="email" errors={errors}>
            Электронная почта
          </InputTitleWithError>
          <Input
            register={register}
            name="email"
            options={{
              required: 'Обязательно к заполнению',
              validate: {
                containAt: (value: string) => value.includes('@') || 'Неверная почта',
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};
