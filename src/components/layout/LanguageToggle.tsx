import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { SUPPORTED_LANGUAGES } from '../../i18n';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      role="group"
      aria-label={t('lang.switch')}
      className="inline-flex overflow-hidden rounded-full border border-line"
    >
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          aria-pressed={current === lng}
          onClick={() => void i18n.changeLanguage(lng)}
          className={clsx(
            'px-2.5 py-1 text-xs font-semibold uppercase transition-colors',
            current === lng ? 'bg-brand text-on-brand' : 'bg-card text-muted hover:text-ink'
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
