import { useEffect } from 'react';

export const useWindowResize = (cb: (e: UIEvent) => void, deps: any[] = []) => {
  useEffect(() => {
    window.addEventListener('resize', cb);

    return () => {
      window.removeEventListener('resize', cb);
    };
  }, deps);
};
