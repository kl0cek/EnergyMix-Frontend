import { clsx } from 'clsx';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Ładowanie"
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-line border-t-brand',
        className
      )}
    />
  );
}
