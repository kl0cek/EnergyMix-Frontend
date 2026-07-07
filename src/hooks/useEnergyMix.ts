import { fetchEnergyMix } from '@/api/energyApi';
import type { DailyEnergyMix } from '@/types/energy';
import type { AsyncStatus } from './types';
import { useLiveQuery } from './useLiveQuery';

export interface UseEnergyMix {
  data: DailyEnergyMix[] | null;
  status: AsyncStatus;
  error: string | null;
  reload: () => void;
}

export function useEnergyMix(): UseEnergyMix {
  const { data, status, error, run } = useLiveQuery(fetchEnergyMix, []);
  return { data, status, error, reload: run };
}
