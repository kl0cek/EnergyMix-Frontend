import { useState } from 'react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { useTimezone } from '@/hooks';
import { formatTime, localeFor } from '@/utils/date';
import type { ChargingWindowResult } from '@/types/energy';

const HALF_HOUR_MS = 30 * 60 * 1000;

interface CleanEnergyStripProps {
  data: ChargingWindowResult;
}

function clampStart(index: number, maxStart: number): number {
  if (index < 0) return 0;
  return Math.min(index, maxStart);
}

export function CleanEnergyStrip({ data }: CleanEnergyStripProps) {
  const { t, i18n } = useTranslation();
  const { timeZone } = useTimezone();
  const [hover, setHover] = useState<number | null>(null);

  const series = data.series;
  if (!series || series.length === 0) return null;

  const locale = localeFor(i18n.language);
  const windowSize = Math.max(1, data.windowHours * 2);
  const maxStart = Math.max(0, series.length - windowSize);
  const maxHeight = Math.max(...series.map((point) => point.cleanPercent));

  const bestStart = clampStart(
    series.findIndex((point) => point.time === data.start),
    maxStart
  );
  const activeStart = hover ?? bestStart;
  const activeEnd = Math.min(activeStart + windowSize, series.length);

  const windowPoints = series.slice(activeStart, activeEnd);
  const avg = Math.round(
    windowPoints.reduce((sum, point) => sum + point.cleanPercent, 0) / windowPoints.length
  );
  const startTime = series[activeStart].time;
  const endTime = new Date(
    new Date(series[activeEnd - 1].time).getTime() + HALF_HOUR_MS
  ).toISOString();

  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, k) => {
    const index = Math.round((k / (tickCount - 1)) * (series.length - 1));
    return formatTime(series[index].time, locale, timeZone);
  });

  return (
    <div className="mt-auto flex flex-col gap-2">
      <div className="flex items-baseline justify-between text-xs">
        <span className="tnum text-muted">
          {formatTime(startTime, locale, timeZone)}–{formatTime(endTime, locale, timeZone)}
        </span>
        <span className="tnum font-semibold text-brand-strong">
          {avg}% <span className="font-normal text-muted">{t('charging.avgClean')}</span>
        </span>
      </div>

      <div className="flex h-16 items-end gap-px" onMouseLeave={() => setHover(null)}>
        {series.map((point, index) => {
          const inWindow = index >= activeStart && index < activeEnd;
          return (
            <div
              key={point.time}
              onMouseEnter={() => setHover(clampStart(index, maxStart))}
              title={`${formatTime(point.time, locale, timeZone)} · ${point.cleanPercent}%`}
              className={clsx(
                'min-w-0 flex-1 cursor-pointer rounded-sm transition-colors',
                inWindow ? 'bg-brand' : 'bg-line hover:bg-brand/40'
              )}
              style={{ height: `${(point.cleanPercent / maxHeight) * 100}%` }}
            />
          );
        })}
      </div>

      <div className="tnum flex justify-between text-[10px] text-muted">
        {ticks.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      <p className="text-xs text-muted">{t('charging.forecastCaption')}</p>
    </div>
  );
}
