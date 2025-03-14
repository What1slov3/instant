import { CSSProperties } from 'react';
import s from './avatar.module.css';

type Props = {
  url: string;
  style?: CSSProperties;
  height?: number;
  width?: number;
};

const defaultSize = 45;

export const Avatar: React.FC<Props> = ({ url, style, height, width }): JSX.Element => {
  return (
    <div
      className={s.wrapper}
      style={{
        ...style,
        minHeight: height ? `${height}px` : width ? `${width}px` : `${defaultSize}px`,
        minWidth: width ? `${width}px` : height ? `${height}px` : `${defaultSize}px`,
        height: height ? `${height}px` : width ? `${width}px` : `${defaultSize}px`,
        width: width ? `${width}px` : height ? `${height}px` : `${defaultSize}px`,
        background: `url('${url}') no-repeat center / cover`,
      }}
    ></div>
  );
};
