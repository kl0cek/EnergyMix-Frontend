import { useState } from 'react';
import { useChargingWindow } from '../../hooks';
import { Badge, Button, Card, ErrorState, Spinner } from '../ui';
import { DurationSelector } from './DurationSelector';
import { WindowResult } from './WindowResult';
import { CleanEnergyStrip } from './CleanEnergyStrip';

const DEFAULT_HOURS = 3;

export function ChargingSection() {
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const { data, status, error, calculate } = useChargingWindow(DEFAULT_HOURS);

  const isLoading = status === 'loading';

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Card className="flex flex-col gap-5 p-6">
        <Badge variant="clean">Ładowanie EV</Badge>

        <div>
          <h2 className="text-2xl font-bold text-ink">Optymalne okno ładowania</h2>
          <p className="mt-1 text-muted">
            Wybierz czas ładowania. Znajdziemy przedział w najbliższych 2 dniach o najwyższym
            udziale czystej energii.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Czas ładowania</span>
            <span className="tnum font-semibold text-brand-strong">{hours} h</span>
          </div>
          <DurationSelector value={hours} onChange={setHours} />
        </div>

        <Button onClick={() => calculate(hours)} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="h-4 w-4" />
              Liczenie…
            </>
          ) : (
            'Przelicz ponownie'
          )}
        </Button>
      </Card>

      <Card className="flex min-h-70 flex-col gap-5 p-6">
        {status === 'error' ? (
          <ErrorState message={error} onRetry={() => calculate(hours)} />
        ) : isLoading && !data ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : data ? (
          <>
            <WindowResult data={data} />
            <CleanEnergyStrip data={data} />
          </>
        ) : null}
      </Card>
    </section>
  );
}
