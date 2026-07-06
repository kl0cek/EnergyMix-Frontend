import { useTranslation } from 'react-i18next';
import { Badge } from '../ui';
import { LanguageToggle, TimezoneToggle, ThemeToggle } from './index';
export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-xl font-bold text-ink">EnergyMix</div>
        <div className="text-sm text-muted">{t('header.subtitle')}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
