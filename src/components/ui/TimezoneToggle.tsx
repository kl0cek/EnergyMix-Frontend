import { useTranslation } from 'react-i18next';
import { useTimezone } from '../../hooks/useTimezone';

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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  );
}
