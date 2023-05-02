import { Input } from '@shared/ui';
import { useInput } from '@shared/hooks';
import s from './emojifinder.module.css';

type Props = {
  searcher: ReturnType<typeof useInput>;
};

export const EmojiFinder: React.FC<Props> = ({ searcher }): JSX.Element => {
  return (
    <div className={s.emojiFinder}>
      <Input
        value={searcher.value}
        onChange={searcher.onChange}
        type="text"
        placeholder="Поищем эмоджи"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};
