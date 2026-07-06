import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  const { t } = useTranslation();
  return (
    <span
      role="status"
      aria-label={t('state.loading')}
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-line border-t-brand',
        className
      )}
    />
  );
}
