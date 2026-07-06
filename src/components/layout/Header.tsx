import { useTranslation } from 'react-i18next';
import { Badge, LanguageToggle, ThemeToggle, TimezoneToggle } from '../ui';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-xl font-bold text-ink">EnergyMix</div>
          <div className="text-sm text-muted">{t('header.subtitle')}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="live">
          <span className="h-2 w-2 rounded-full bg-brand" />
          {t('header.live')}
        </Badge>
        <TimezoneToggle />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
