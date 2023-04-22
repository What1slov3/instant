import classNames from 'classnames';
import { ImageObject } from '@common/hooks';
import s from './attachmentspreview.module.css';

type PropsAttachment = {
  imageObject: ImageObject;
  deleteHandler: (filename: string) => void;
};

const Attachment: React.FC<PropsAttachment> = ({ imageObject, deleteHandler}): JSX.Element => {
  return (
    <div className={classNames(s.attachment, 'flex flexaic')}>
      <div
        className={classNames(s.deleteAttachment, 'flex flexaic flexjcc')}
        onClick={() => deleteHandler(imageObject.name)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </div>
      <img src={imageObject.objectURL} />
    </div>
  );
};

type Props = {
  imageObjects: ImageObject[];
  deleteHandler: (filename: string) => void;
  error: string | null;
};

const AttachmentsPreview: React.FC<Props> = ({ imageObjects, deleteHandler, error }): JSX.Element => {
  const renderAttachments = () => {
    if (imageObjects.length > 0) {
      return imageObjects.map((imageObject) => (
        <Attachment
          key={imageObject.name}
          imageObject={imageObject}
          deleteHandler={deleteHandler}
        />
      ));
    }
  };

  return (
    <div className={classNames('flex gap10', { [s.attachments]: imageObjects.length > 0 })}>
      {renderAttachments()}
      {error && <div className={classNames(s.error, 'smoothAppearance')}>{error}</div>}
    </div>
  );
};

export default AttachmentsPreview;
