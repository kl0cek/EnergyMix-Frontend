import { clsx } from 'clsx';

interface DurationSelectorProps {
  value: number;
  onChange: (hours: number) => void;
  min?: number;
  max?: number;
}

export function DurationSelector({ value, onChange, min = 1, max = 6 }: DurationSelectorProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="grid grid-cols-6 gap-2">
      {options.map((hours) => (
        <button
          key={hours}
          type="button"
          aria-pressed={hours === value}
          onClick={() => onChange(hours)}
          className={clsx(
            'tnum rounded-xl py-3 text-sm font-semibold transition-colors',
            hours === value
              ? 'bg-brand text-on-brand'
              : 'border border-line bg-card text-ink hover:border-brand/50'
          )}
        >
          {hours}
        </button>
      ))}
    </div>
  );
}
