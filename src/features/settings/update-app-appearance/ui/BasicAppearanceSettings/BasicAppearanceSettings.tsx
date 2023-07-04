import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { updateAppSettings, useAppSelector } from '@shared/state';
import { InputTitle } from '@shared/ui';
import { Range } from '@shared/components';
import s from './basicappearancesettings.module.css';

export const BasicAppearanceSettings: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const fontSize = useAppSelector((state) => state.app.settings.messageFontSize);

  const setMessageFontSize = (value: number) => {
    dispatch(updateAppSettings({ messageFontSize: value }));
  };

  return (
    <div className={classNames(s.wrapper, 'flex flexcolumn gap20')}>
      <h2>Внешний вид</h2>
      <div>
        <InputTitle>Размер текста сообщений</InputTitle>
        <Range values={[12, 14, 15, 16, 18]} value={fontSize} setValue={setMessageFontSize} defaultValue={14} />
      </div>
    </div>
  );
};
