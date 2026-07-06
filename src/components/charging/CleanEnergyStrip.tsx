import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { useTimezone } from '../../hooks';
import { formatTime, localeFor } from '../../utils/date';
import type { ChargingWindowResult } from '../../types/energy';

interface CleanEnergyStripProps {
  data: ChargingWindowResult;
}

export function CleanEnergyStrip({ data }: CleanEnergyStripProps) {
  const { t, i18n } = useTranslation();
  const { timeZone } = useTimezone();

  if (!data.series || data.series.length === 0) return null;

  const locale = localeFor(i18n.language);
  const windowStart = new Date(data.start).getTime();
  const windowEnd = new Date(data.end).getTime();
  const max = Math.max(...data.series.map((point) => point.cleanPercent));

  return (
    <div className="mt-auto flex flex-col gap-2">
      <div className="flex h-16 items-end gap-px">
        {data.series.map((point) => {
          const time = new Date(point.time).getTime();
          const inWindow = time >= windowStart && time < windowEnd;
          return (
            <div
              key={point.time}
              title={`${formatTime(point.time, locale, timeZone)} · ${point.cleanPercent}%`}
              className={clsx('min-w-0 flex-1 rounded-sm', inWindow ? 'bg-brand' : 'bg-line')}
              style={{ height: `${(point.cleanPercent / max) * 100}%` }}
            />
          );
        })}
      </div>
      <p className="text-xs text-muted">{t('charging.forecastCaption')}</p>
    </div>
  );
}
