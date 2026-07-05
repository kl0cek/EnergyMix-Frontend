import { useCallback, useEffect, useState } from 'react';
import { fetchEnergyMix } from '../api/energyApi';
import type { DailyEnergyMix } from '../types/energy';
import type { AsyncStatus } from './types';

export interface UseEnergyMix {
  data: DailyEnergyMix[] | null;
  status: AsyncStatus;
  error: string | null;
  reload: () => void;
}

export function useEnergyMix(): UseEnergyMix {
  const [data, setData] = useState<DailyEnergyMix[] | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let active = true;
    setStatus('loading');
    setError(null);

    fetchEnergyMix()
      .then((result) => {
        if (!active) return;
        setData(result);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Nieznany błąd.');
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => load(), [load]);

  return { data, status, error, reload: load };
}
