import classNames from 'classnames';
import type { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types';
import s from './input.module.css';

type Props =
  | (JSX.IntrinsicElements['input'] & {
      register: UseFormRegister<any>;
      name: string;
      options?: RegisterOptions<FieldValues, string> | undefined;
    })
  | (JSX.IntrinsicElements['input'] & { register?: never; name?: never; options?: never });

export const Input: React.FC<Props> = ({ register, options, name, ...props }): JSX.Element => {
  if (register && name) {
    return (
      <input
        {...props}
        {...register(name, options)}
        className={classNames(props.className, s.input)}
        autoComplete="off"
      />
    );
  }
  return <input {...props} className={classNames(props.className, s.input)} />;
};
