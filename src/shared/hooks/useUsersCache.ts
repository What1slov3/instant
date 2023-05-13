import { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { APIQueries } from '@shared/api/rest';
import { useAxiosQuery } from '@shared/hooks';
import { updateUsersCache, useAppSelector } from '@shared/state';
import { config } from '@shared/config';
import type { ID } from '@shared/types';

export const useUsersCache = () => {
  const dispatch = useDispatch<any>();

  const cache = useAppSelector((state) => state.usersCache);

  const { startRequest, isLoading, data } = useAxiosQuery(APIQueries.users.getUsers);

  const bufferRef = useRef<Set<ID>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      if (bufferRef.current.size) {
        startRequest(Array.from(bufferRef.current));
        bufferRef.current.clear();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const proxyCache = useMemo(() => {
    return new Proxy(cache, {
      get: (target, name: string) => {
        if (target[name]) {
          if (Date.now() - target[name].timestamp > config.USER_CACHE_TIMEOUT) {
            bufferRef.current.add(name);
          }
          return target[name];
        } else {
          bufferRef.current.add(name);
        }
      },
    });
  }, [cache]);

  useEffect(() => {
    if (data) {
      dispatch(updateUsersCache(data));
    }
  }, [data]);

  return { cache: proxyCache, isLoading };
};
