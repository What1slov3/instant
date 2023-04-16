import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Range from '@components/Range/Range';
import InputTitle from '@layouts/Input/InputeTitle';
import { LSAInstance } from '../../..';
import s from './appearancesubpage.module.css';

const AppearanceSubpage: React.FC = (): JSX.Element => {
  const [textMessageSize, setTextMessageSize] = useState(Number(LSAInstance.getSetting('messageTextSize')));

  useEffect(() => {
    console.log(Number(LSAInstance.getSetting('messageTextSize')));
    LSAInstance.setSetting('messageTextSize', textMessageSize);
  }, [textMessageSize]);

  return (
    <div className={classNames(s.wrapper, 'flex flexcolumn gap20')}>
      <h2>Внешний вид</h2>
      <div>
        <InputTitle>Размер текста сообщений</InputTitle>
        <Range values={[12, 14, 15, 16, 18]} value={textMessageSize} setValue={setTextMessageSize} defaultValue={14} />
      </div>
    </div>
  );
};

export default AppearanceSubpage;
