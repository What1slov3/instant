import { useState } from 'react';
import classNames from 'classnames';
import { useModalControls } from '@common/hooks';
import s from './imageattachment.module.css';

type Props = {
  url: string;
  canOpenModal?: boolean;
};

const ImageAttachment: React.FC<Props> = ({ url, canOpenModal = true }): JSX.Element => {
  const modalControls = useModalControls();

  const [error, setError] = useState<boolean>(false);

  const handleLoad = (e: any) => {
    (e.target as HTMLImageElement).classList.add(s.loadedImage);
  };

  const handleError = () => {
    setError(true);
  };

  const openAttachmentHandler = () => {
    if (canOpenModal) {
      modalControls.open({ name: 'imageAttachment', payload: { url } });
    }
  };

  const renderAttachments = () => {
    if (error) {
      return (
        <div className={classNames(s.failedImage, 'flex flexaic flexjcc')}>
          Вероятно, тут была красивая картинка <span className="inMessageEmoji">😕</span>
        </div>
      );
    }

    return (
      <img
        src={`${process.env.REACT_APP_API_URL}${url}`}
        className={s.attachmentImage}
        onLoad={handleLoad}
        onError={handleError}
        onClick={openAttachmentHandler}
        loading="lazy"
      />
    );
  };

  return renderAttachments();
};

export default ImageAttachment;
