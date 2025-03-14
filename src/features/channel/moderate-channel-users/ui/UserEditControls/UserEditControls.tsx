import { useState } from 'react';
import { Checkbox } from '@shared/components';
import s from './usereditcontrols.module.css';

export const UserEditControls: React.FC = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={s.wrapper}>
      <Checkbox checked={checked} onClick={() => setChecked((prev) => !prev)} />
    </div>
  );
};
