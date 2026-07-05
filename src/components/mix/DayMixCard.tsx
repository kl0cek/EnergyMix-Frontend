import { Card } from '../ui';
import { DonutChart } from './DonutChart';
import { formatShortDate, relativeDayLabel } from '../../utils/date';
import type { DailyEnergyMix } from '../../types/energy';

interface DayMixCardProps {
  day: DailyEnergyMix;
  index: number;
}

export function DayMixCard({ day, index }: DayMixCardProps) {
  const clean = Math.round(day.cleanEnergyPercent);
  const fossil = 100 - clean;

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-ink">{relativeDayLabel(index)}</h3>
        <span className="tnum text-sm text-muted">{formatShortDate(day.date)}</span>
      </div>

      <DonutChart mix={day.generationMix} cleanPercent={day.cleanEnergyPercent} />

      <div className="flex items-center justify-center gap-5 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="text-muted">Czysta</span>
          <span className="tnum font-semibold text-ink">{clean}%</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-neutral-400" />
          <span className="text-muted">Kopalne</span>
          <span className="tnum font-semibold text-ink">{fossil}%</span>
        </span>
      </div>
    </Card>
  );
}
