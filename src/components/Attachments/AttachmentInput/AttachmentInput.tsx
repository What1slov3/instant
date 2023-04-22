import classNames from 'classnames';
import type { IMultipleUploadHandlers } from '@common/hooks';
import s from './attachmentinput.module.css';

type Props = {
  handlers: IMultipleUploadHandlers;
};

const AttachmentInput: React.FC<Props> = ({ handlers }): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <label htmlFor="attachment" className={classNames(s.attachment)}>
        <i className="fa-solid fa-paperclip"></i>
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

export default AttachmentInput;
  