import { useCallback, useEffect, useState } from 'react';
import { fetchChargingWindow } from '../api/energyApi';
import type { ChargingWindowResult } from '../types/energy';
import type { AsyncStatus } from './types';

export interface UseChargingWindow {
  data: ChargingWindowResult | null;
  status: AsyncStatus;
  error: string | null;
  calculate: (hours: number) => void;
}

export function useChargingWindow(defaultHours: number): UseChargingWindow {
  const [data, setData] = useState<ChargingWindowResult | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((hours: number) => {
    setStatus('loading');
    setError(null);

    fetchChargingWindow(hours)
      .then((result) => {
        setData(result);
        setStatus('success');
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Nieznany błąd.');
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    calculate(defaultHours);
  }, [calculate, defaultHours]);

  return { data, status, error, calculate };
}
