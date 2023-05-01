import { useEffect, useState } from 'react';

type Args = {
  initial?: string;
  required?: boolean;
  validationType?: '';
  validation?: Function;
  setter?: (value: string) => string;
};

export const useInput = ({ initial = '', required = false, validationType = '', validation, setter }: Args) => {
  const [value, setValue] = useState<string>(initial);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (validationType && validation) {
      throw new Error('Cannot be used at the same time: validation, validationType');
    }
  }, [validation, validationType]);

  useEffect(() => {
    try {
      if (validation) {
        validation(value);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, [value]);

  return {
    value,
    error,
    onChange: (e: any) => {
      setValue(setter ? setter(e.target.value) : e.target.value);
      error && setError('');
    },
    onBlur: () => {
      if (!value && required) {
        setError('Поле должно быть заполнено');
      }
    },
  };
};
