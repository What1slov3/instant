import { useEffect } from 'react';

export const useWindowResize = (cb: (e: UIEvent) => void) => {
  useEffect(() => {
    window.addEventListener('resize', cb);

    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);
};
