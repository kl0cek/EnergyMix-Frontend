import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTimezone } from '@/hooks';

export function TimezoneToggle() {
  const { t } = useTranslation();
  const { preference, cycle } = useTimezone();

  const label = preference === 'local' ? t('tz.local') : preference.toUpperCase();

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t('tz.switch')}
      title={t('tz.switch')}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-card px-3 text-xs font-semibold text-ink transition-colors hover:border-brand/50"
    >
      <Clock size={14} />
      {label}
    </button>
  );
}
