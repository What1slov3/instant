import classNames from 'classnames';
import { IconButton } from '@shared/ui';
import type { IMultipleUploadHandlers } from '@shared/hooks';
import s from './attachmentinput.module.css';

type Props = {
  handlers: IMultipleUploadHandlers;
};

export const AttachmentInput: React.FC<Props> = ({ handlers }): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <label htmlFor="attachment" className={classNames(s.attachment)}>
        <IconButton faClass="fa-solid fa-paperclip" />
      </label>
      <input
        type="file"
        accept="image/*"
        id="attachment"
        multiple={true}
        className={s.attachmentInput}
        onChange={handlers.uploadHandler}
      />
    </div>
  );
};
