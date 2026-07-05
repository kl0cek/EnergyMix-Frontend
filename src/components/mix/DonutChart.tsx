import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { FUELS } from '../../config/fuels';
import type { GenerationMix } from '../../types/energy';

interface DonutChartProps {
  mix: GenerationMix;
  cleanPercent: number;
}

interface TooltipEntry {
  name?: string;
  value?: number;
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-line bg-card px-3 py-1.5 text-xs shadow-sm">
      <span className="font-medium text-ink">{entry.name}</span>{' '}
      <span className="tnum text-muted">{entry.value}%</span>
    </div>
  );
}

export function DonutChart({ mix, cleanPercent }: DonutChartProps) {
  const data = FUELS.map((fuel) => ({
    key: fuel.key,
    label: fuel.label,
    value: mix[fuel.key],
    color: fuel.color,
  })).filter((slice) => slice.value > 0);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-55">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="66%"
            outerRadius="100%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="var(--color-card)"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {data.map((slice) => (
              <Cell key={slice.key} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="tnum text-4xl font-bold text-brand-strong">
          {Math.round(cleanPercent)}
          <span className="align-top text-xl">%</span>
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Czysta</span>
      </div>
    </div>
  );
}
