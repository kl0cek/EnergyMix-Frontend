import type { FuelKey } from '../types/energy';

export interface FuelMeta {
  key: FuelKey;
  clean: boolean;
  color: string;
}

export const FUELS: readonly FuelMeta[] = [
  { key: 'wind', clean: true, color: '#22a55b' },
  { key: 'nuclear', clean: true, color: '#15703a' },
  { key: 'solar', clean: true, color: '#8fca3f' },
  { key: 'hydro', clean: true, color: '#2bb3a3' },
  { key: 'biomass', clean: true, color: '#b6c23f' },
  { key: 'gas', clean: false, color: '#9aa0a6' },
  { key: 'imports', clean: false, color: '#c9bfa8' },
  { key: 'coal', clean: false, color: '#4b4b4b' },
  { key: 'other', clean: false, color: '#d9d9d9' },
];

export const FUEL_ORDER: readonly FuelKey[] = FUELS.map((f) => f.key);

export const FUEL_BY_KEY = Object.fromEntries(FUELS.map((f) => [f.key, f])) as Record<
  FuelKey,
  FuelMeta
>;

export const CLEAN_FUEL_KEYS: readonly FuelKey[] = FUELS.filter((f) => f.clean).map((f) => f.key);
