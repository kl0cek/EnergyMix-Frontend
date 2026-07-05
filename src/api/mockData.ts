import type {
  ChargingWindowResult,
  DailyEnergyMix,
  ForecastPoint,
  GenerationMix,
} from '../types/energy';

const DAY_MIXES: GenerationMix[] = [
  {
    wind: 22,
    nuclear: 15,
    solar: 6,
    hydro: 2,
    biomass: 11,
    gas: 30,
    imports: 8,
    coal: 2,
    other: 4,
  },
  {
    wind: 26,
    nuclear: 16,
    solar: 7,
    hydro: 2,
    biomass: 11,
    gas: 26,
    imports: 7,
    coal: 2,
    other: 3,
  },
  {
    wind: 18,
    nuclear: 14,
    solar: 5,
    hydro: 2,
    biomass: 10,
    gas: 34,
    imports: 9,
    coal: 3,
    other: 5,
  },
];

const CLEAN_KEYS = ['wind', 'nuclear', 'solar', 'hydro', 'biomass'] as const;

function cleanPercent(mix: GenerationMix): number {
  return CLEAN_KEYS.reduce((sum, key) => sum + mix[key], 0);
}

function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function mockEnergyMix(): DailyEnergyMix[] {
  return DAY_MIXES.map((generationMix, i) => ({
    date: isoDate(i),
    intervals: 48,
    generationMix,
    cleanEnergyPercent: cleanPercent(generationMix),
  }));
}

function buildForecastSeries(): ForecastPoint[] {
  const points: ForecastPoint[] = [];
  const start = new Date();
  start.setUTCDate(start.getUTCDate() + 1);
  start.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < 96; i += 1) {
    const time = new Date(start.getTime() + i * 30 * 60 * 1000);
    const hour = time.getUTCHours() + time.getUTCMinutes() / 60;
    // Higher clean share overnight and midday, lower on evening peak.
    const base =
      55 +
      18 * Math.cos(((hour - 3) / 24) * 2 * Math.PI) +
      10 * Math.sin(((hour - 13) / 24) * 4 * Math.PI);
    const cleanPct = Math.max(20, Math.min(95, Math.round(base)));
    points.push({ time: time.toISOString(), cleanPercent: cleanPct });
  }
  return points;
}

export function mockChargingWindow(hours: number): ChargingWindowResult {
  const series = buildForecastSeries();
  const windowSize = hours * 2;

  let bestStart = 0;
  let bestSum = -Infinity;
  for (let i = 0; i + windowSize <= series.length; i += 1) {
    let sum = 0;
    for (let j = i; j < i + windowSize; j += 1) sum += series[j].cleanPercent;
    if (sum > bestSum) {
      bestSum = sum;
      bestStart = i;
    }
  }

  const startPoint = series[bestStart];
  const endPoint = series[bestStart + windowSize - 1];
  const endTime = new Date(new Date(endPoint.time).getTime() + 30 * 60 * 1000).toISOString();

  return {
    windowHours: hours,
    start: startPoint.time,
    end: endTime,
    averageCleanEnergyPercent: Math.round((bestSum / windowSize) * 10) / 10,
    series,
  };
}
