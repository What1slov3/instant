import { useEffect } from 'react';

export const useGlobalListener = (
  event: keyof GlobalEventHandlersEventMap,
  listen: boolean | (() => boolean),
  cb: (e: any) => void,
  deps: any[] = []
) => {
  useEffect(() => {
    listen = typeof listen === 'function' ? listen() : listen;

    if (listen) {
      document.addEventListener(event, cb);
    }

    return () => {
      if (listen) {
        document.removeEventListener(event, cb);
      }
    };
  }, [...deps, listen]);
};
