import { useCallback, useRef, useState, useTransition } from 'react';
import { useIntersectionObserver } from '@shared/hooks';
import type { FCChildren } from '@shared/types';

type PropsEmojiRow = {
  virtual?: boolean;
} & FCChildren;

export const Row: React.FC<PropsEmojiRow> = ({ children, virtual = true }): JSX.Element => {
  const [, startTranstition] = useTransition();
  const [isShowing, setIsShowing] = useState(!virtual);

  const rowRef = useRef<HTMLDivElement>(null);

  const intersectionCb = useCallback<IntersectionObserverCallback>((entries) => {
    startTranstition(() => setIsShowing(entries[0].isIntersecting));
  }, []);
  useIntersectionObserver(rowRef.current, intersectionCb);

  return (
    <div ref={virtual ? rowRef : undefined} className="flex" style={{ height: '36px', width: '100%' }}>
      {isShowing && children}
    </div>
  );
};
