import { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { APIQueries } from '@shared/api/rest';
import { useAxiosQuery } from '@shared/hooks';
import { updateUsersCache, useAppSelector } from '@shared/state';
import { CONSTANTS } from '@shared/config';
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
      get: (target, name) => {
        if (target[name as string]) {
          if (Date.now() - target[name as string].timestamp > CONSTANTS.USER_CACHE_TIMEOUT) {
            bufferRef.current.add(name as string);
          }
          return target[name as string];
        } else {
          bufferRef.current.add(name as string);
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
