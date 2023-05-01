import { ImageAttachmentPayload } from '@shared/types';
import s from './imageattachmentmodal.module.css';

export const ImageAttachmentModal: React.FC<ImageAttachmentPayload> = ({ url }): JSX.Element => {
  return (
    <a href={`${process.env.REACT_APP_API_URL}${url}`} target="_blank" rel="noreferrer" className={s.wrapper}>
      <img src={`${process.env.REACT_APP_API_URL}${url}`} className={s.image} loading="lazy" />
      <div className={s.tagline}>Открыть оригинал</div>
    </a>
  );
};
