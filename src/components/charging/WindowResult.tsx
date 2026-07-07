import { useTranslation } from 'react-i18next';
import { useTimezone } from '@/hooks';
import { formatTime, formatWeekdayDate, localeFor } from '@/utils/date';
import type { ChargingWindowResult } from '@/types/energy';

interface WindowResultProps {
  data: ChargingWindowResult;
}

function TimeBox({
  label,
  iso,
  locale,
  timeZone,
}: {
  label: string;
  iso: string;
  locale: string;
  timeZone: string;
}) {
  return (
    <div className="rounded-xl border border-line px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className="tnum mt-1 text-2xl font-bold text-ink">
        {formatTime(iso, locale, timeZone)}
      </div>
      <div className="mt-0.5 text-xs text-muted">{formatWeekdayDate(iso, locale, timeZone)}</div>
    </div>
  );
}

export function WindowResult({ data }: WindowResultProps) {
  const { t, i18n } = useTranslation();
  const { timeZone } = useTimezone();
  const locale = localeFor(i18n.language);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <span className="h-2 w-2 rounded-full bg-brand" />
        {t('charging.bestWindow')}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="tnum text-5xl font-bold text-brand-strong">
          {Math.round(data.averageCleanEnergyPercent)}
          <span className="align-top text-2xl">%</span>
        </span>
        <span className="text-sm text-muted">{t('charging.avgClean')}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TimeBox label={t('charging.start')} iso={data.start} locale={locale} timeZone={timeZone} />
        <span className="text-xl text-muted">→</span>
        <TimeBox label={t('charging.end')} iso={data.end} locale={locale} timeZone={timeZone} />
      </div>
    </div>
  );
}
