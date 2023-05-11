import { ErrorMessage } from '@hookform/error-message';
import { InputTitleError, InputTitle } from '@shared/ui';
import type { FieldErrors } from 'react-hook-form';
import type { FCChildren } from '@shared/types';

type Props = {
  name: string;
  errors: FieldErrors;
} & FCChildren;

export const InputTitleWithError: React.FC<Props> = ({ children, errors, name }): JSX.Element => {
  return (
    <InputTitle>
      {children}
      <ErrorMessage
        errors={errors}
        name={name}
        render={(error) => <InputTitleError>{error.message}</InputTitleError>}
      />
    </InputTitle>
  );
};
