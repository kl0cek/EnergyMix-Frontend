import { clsx } from 'clsx'
import { Card } from '../ui'
import { FUELS } from '../../utils/fuels'

export function FuelLegend() {
  return (
    <Card className="flex flex-wrap items-center gap-2 px-4 py-3">
      {FUELS.map((fuel) => (
        <span
          key={fuel.key}
          className={clsx(
            'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm',
            fuel.clean
              ? 'border border-brand/30 bg-brand-soft text-brand-strong'
              : 'border border-transparent text-ink',
          )}
        >
          <span
            className="h-3 w-3 rounded-sm"
            style={{ background: fuel.color }}
          />
          {fuel.label}
        </span>
      ))}
    </Card>
  )
}
