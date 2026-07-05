export type FuelKey =
  'wind' | 'nuclear' | 'solar' | 'hydro' | 'biomass' | 'gas' | 'imports' | 'coal' | 'other';

export type GenerationMix = Record<FuelKey, number>;

export interface DailyEnergyMix {
  date: string;
  intervals: number;
  generationMix: GenerationMix;
  cleanEnergyPercent: number;
}

export interface ChargingWindow {
  windowHours: number;
  start: string;
  end: string;
  averageCleanEnergyPercent: number;
}

export interface ForecastPoint {
  time: string;
  cleanPercent: number;
}

export interface ChargingWindowResult extends ChargingWindow {
  series?: ForecastPoint[];
}
