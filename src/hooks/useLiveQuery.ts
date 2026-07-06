import { useCallback, useEffect, useRef, useState } from 'react';
import type { AsyncStatus } from './types';

const DEFAULT_REFRESH_MS = 30 * 60 * 1000;

export interface LiveQuery<T, A extends unknown[]> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  run: (...args: A) => void;
}

export function useLiveQuery<T, A extends unknown[]>(
  fetcher: (...args: A) => Promise<T>,
  initialArgs: A,
  refreshMs: number = DEFAULT_REFRESH_MS
): LiveQuery<T, A> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const lastArgs = useRef<A>(initialArgs);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const execute = useCallback((silent: boolean, args: A) => {
    lastArgs.current = args;
    if (!silent) setStatus('loading');
    setError(null);

    return fetcherRef
      .current(...args)
      .then((result) => {
        if (!mounted.current) return;
        setData(result);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (!mounted.current || silent) return;
        setError(err instanceof Error ? err.message : 'Nieznany błąd.');
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    void execute(false, lastArgs.current);
  }, [execute]);

  useEffect(() => {
    if (!refreshMs) return;
    const id = setInterval(() => void execute(true, lastArgs.current), refreshMs);
    return () => clearInterval(id);
  }, [execute, refreshMs]);

  const run = useCallback((...args: A) => void execute(false, args), [execute]);

  return { data, status, error, run };
}
