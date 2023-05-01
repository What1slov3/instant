import { CSSProperties, useEffect } from 'react';
import type { FCChildren } from '@shared/types';
import s from './page.module.css';

type TProps = FCChildren & {
  style?: CSSProperties;
  title?: string;
};

export const Page: React.FC<TProps> = ({ style, children, title }): JSX.Element => {
  useEffect(() => {
    window.document.title = title || 'Instant';
  }, []);

  return (
    <div className={s.wrapper} style={style}>
      {children}
    </div>
  );
};
