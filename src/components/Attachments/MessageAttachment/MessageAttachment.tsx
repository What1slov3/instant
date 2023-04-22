import { MessageAttachments } from '@customTypes/index';
import ImageAttachment from '../ImageAttachment/ImageAttachment';

type Props = {
  attachments: MessageAttachments;
  canOpenModal?: boolean;
};

const MessageAttachment: React.FC<Props> = ({ attachments, canOpenModal }) => {
  const renderAttachment = () => {
    if (attachments.files) {
      return (
        <div className="flex flexwrap gap10">
          {attachments.files.map((url) => (
            <ImageAttachment canOpenModal={canOpenModal} key={url} url={url} />
          ))}
        </div>
      );
    }
    return null;
  };

  return renderAttachment();
};

export default MessageAttachment;
