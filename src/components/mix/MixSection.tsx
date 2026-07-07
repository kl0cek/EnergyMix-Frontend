import { useTranslation } from 'react-i18next';
import { useEnergyMix } from '@/hooks';
import { ErrorState, LoadingGrid } from '@/components/ui';
import { DayMixCard } from './DayMixCard';
import { FuelLegend } from './FuelLegend';

export function MixSection() {
  const { t } = useTranslation();
  const { data, status, error, reload } = useEnergyMix();

  return (
    <section className="flex flex-col gap-5">
      <header>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t('mix.title')}</h2>
        <p className="mt-1 text-muted">{t('mix.subtitle')}</p>
      </header>

      {(status === 'loading' || status === 'idle') && <LoadingGrid />}
      {status === 'error' && <ErrorState message={error} onRetry={reload} />}
      {status === 'success' && data && (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            {data.map((day, index) => (
              <DayMixCard key={day.date} day={day} index={index} />
            ))}
          </div>
          <FuelLegend />
        </>
      )}
    </section>
  );
}
