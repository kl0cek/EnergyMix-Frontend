import { useEnergyMix } from '../../hooks';
import { Card, ErrorState, Spinner } from '../ui';
import { DayMixCard } from './DayMixCard';
import { FuelLegend } from './FuelLegend';

function LoadingGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex h-72 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </Card>
      ))}
    </div>
  );
}

export function MixSection() {
  const { data, status, error, reload } = useEnergyMix();

  return (
    <section className="flex flex-col gap-5">
      <header>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Miks energetyczny — 3 dni</h2>
        <p className="mt-1 text-muted">
          Średni udział źródeł energii. Czysta energia = biomasa, atom, woda, wiatr, słońce.
        </p>
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
