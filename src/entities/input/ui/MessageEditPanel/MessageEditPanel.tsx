import classNames from 'classnames';
import { TextButton } from '@shared/ui';
import s from './messageeditpanel.module.css';

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

export const MessageEditPanel: React.FC<Props> = ({ onSave, onCancel }): JSX.Element => {
  return (
    <div className={classNames('flex flexaic gap10', s.wrapper)}>
      <TextButton onClick={onSave}>Сохранить</TextButton>
      <TextButton onClick={onCancel}>Отмена</TextButton>
    </div>
  );
};
