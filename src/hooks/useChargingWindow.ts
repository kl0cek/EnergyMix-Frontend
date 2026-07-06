import { fetchChargingWindow } from '../api/energyApi';
import type { ChargingWindowResult } from '../types/energy';
import type { AsyncStatus } from './types';
import { useLiveQuery } from './useLiveQuery';

export interface UseChargingWindow {
  data: ChargingWindowResult | null;
  status: AsyncStatus;
  error: string | null;
  calculate: (hours: number) => void;
}

export function useChargingWindow(defaultHours: number): UseChargingWindow {
  const { data, status, error, run } = useLiveQuery(fetchChargingWindow, [defaultHours]);
  return { data, status, error, calculate: run };
}
