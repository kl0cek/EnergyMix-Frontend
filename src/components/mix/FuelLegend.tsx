import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui';
import { FUELS, type FuelMeta } from '@/utils/fuels';

export function FuelLegend() {
  const { t } = useTranslation();

  const item = (fuel: FuelMeta) => (
    <span key={fuel.key} className="inline-flex items-center gap-2 text-sm text-ink">
      <span className="h-3.5 w-3.5 rounded-sm" style={{ background: fuel.color }} />
      {t(`fuels.${fuel.key}`)}
    </span>
  );

  const clean = FUELS.filter((fuel) => fuel.clean);
  const fossil = FUELS.filter((fuel) => !fuel.clean);

  return (
    <Card className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-brand/10 px-4 py-2">
        <span className="text-xs font-semibold tracking-wide text-brand-strong uppercase">
          {t('mix.cleanEnergy')}
        </span>
        {clean.map(item)}
      </div>
      {fossil.map(item)}
    </Card>
  );
}
