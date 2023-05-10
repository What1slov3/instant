import { useState, useCallback } from 'react';
import type { AxiosResponse } from 'axios';

export const useAxiosQuery = <F extends (...args: any) => Promise<AxiosResponse>>(axiosQuery: F) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<Awaited<ReturnType<F>>['data'] | null>(null);

  const startRequest = useCallback((...args: Parameters<F>) => {
    setIsLoading(true);
    axiosQuery(...args)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { startRequest, isLoading, error, data };
};
