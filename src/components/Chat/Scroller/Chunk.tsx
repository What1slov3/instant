import { useCallback, useRef, useState, useTransition } from 'react';
import { useIntersectionObserver } from '@common/hooks';

type Props = {
  content: JSX.Element | JSX.Element[];
};

const Chunk: React.FC<Props> = ({ content }): JSX.Element => {
  const [, startTranstition] = useTransition();
  const [show, setShow] = useState(true);
  const [height, setHeight] = useState(window.innerHeight);

  const chunkRef = useRef<HTMLDivElement>(null!);

  const intersectionCb = useCallback<IntersectionObserverCallback>((entries) => {
    startTranstition(() => setShow(entries[0].isIntersecting));

    if (!entries[0].isIntersecting) {
      setHeight(entries[0].boundingClientRect.height);
    }
  }, []);
  useIntersectionObserver(chunkRef.current, intersectionCb);

  return (
    <div ref={chunkRef} style={{ height: show ? 'auto' : `${height}px` }}>
      {show && content}
    </div>
  );
};

export default Chunk;
