import { useEffect, useRef } from 'react';

export const useResizeObserver = <T extends Element | null>(node: T, onResize: ResizeObserverCallback) => {
  const resizeObserver = useRef<ResizeObserver>();

  useEffect(() => {
    if (node) {
      resizeObserver.current = new ResizeObserver(onResize);
      resizeObserver.current.observe(node);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [node, onResize]);
};
