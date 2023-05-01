import { useEffect, useRef } from 'react';

export const useIntersectionObserver = <T extends HTMLElement | null>(
  node: T,
  onIntersection: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const intersectionObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    if (node) {
      intersectionObserver.current = new IntersectionObserver(onIntersection, options);
      intersectionObserver.current.observe(node);
    }

    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [node, onIntersection, options]);
};
