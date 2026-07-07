import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { FUELS } from '@/utils/fuels';
import type { GenerationMix } from '@/types/energy';
import { RenderPieCallout } from './RenderPieCallout';
import type { PieCalloutProps } from './RenderPieCallout';

interface DonutChartProps {
  mix: GenerationMix;
  cleanPercent: number;
}

interface Slice {
  key: string;
  label: string;
  value: number;
  fill: string;
}

export function DonutChart({ mix, cleanPercent }: DonutChartProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState<number | undefined>(undefined);

  const slices: Slice[] = FUELS.map((fuel) => ({
    key: fuel.key,
    label: t(`fuels.${fuel.key}`),
    value: mix[fuel.key],
    fill: fuel.color,
  })).filter((slice) => slice.value > 0);

  const data = slices.map((slice, index) => ({
    ...slice,
    fillOpacity: active === undefined || active === index ? 1 : 0.35,
  }));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-60 [&_svg]:overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0.6}
            startAngle={90}
            endAngle={-270}
            stroke="var(--color-card)"
            strokeWidth={1}
            isAnimationActive={false}
            labelLine={false}
            label={(props) =>
              (props as PieCalloutProps).index === active ? (
                <RenderPieCallout {...(props as PieCalloutProps)} />
              ) : null
            }
            onMouseEnter={(_, index) => setActive(index)}
            onMouseLeave={() => setActive(undefined)}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="tnum text-4xl font-bold text-brand-strong">
          {Math.round(cleanPercent)}
          <span className="align-top text-xl">%</span>
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {t('mix.clean')}
        </span>
      </div>
    </div>
  );
}
