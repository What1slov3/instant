import { CSSProperties } from 'react';
import s from './avatar.module.css';

type Props = {
  url: string;
  style?: CSSProperties;
  height?: number;
  width?: number;
};

export const Avatar: React.FC<Props> = ({ url, style, height, width }): JSX.Element => {
  return (
    <div
      className={s.wrapper}
      style={{
        ...style,
        minHeight: height ? `${height}px` : width ? `${width}px` : '45px',
        minWidth: width ? `${width}px` : height ? `${height}px` : '45px',
        height: height ? `${height}px` : width ? `${width}px` : '45px',
        width: width ? `${width}px` : height ? `${height}px` : '45px',
        background: `url('${url}') no-repeat center / cover`,
      }}
    ></div>
  );
};
