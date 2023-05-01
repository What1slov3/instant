import { useGlobalListener } from '@shared/hooks';
import type { FCChildren } from '@shared/types';

type Props = FCChildren & {
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onEnter?: Function;
};

export const Button: React.FC<Props> = ({ children, style, onClick, className, onEnter, onKeyDown }): JSX.Element => {
  useGlobalListener(
    'keypress',
    Boolean(onEnter),
    (e: React.KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter?.();
      }
    },
    [onEnter]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      onKeyDown?.(e);
    }
  };

  return (
    <div className={className} style={style} onClick={onClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      {children}
    </div>
  );
};