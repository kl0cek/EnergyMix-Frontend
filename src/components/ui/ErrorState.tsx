import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Card } from './Card';

interface ErrorStateProps {
  message: string | null;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="font-semibold text-ink">{t('state.errorTitle')}</p>
      {message && <p className="text-sm text-muted">{message}</p>}
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          {t('state.retry')}
        </Button>
      )}
    </Card>
  );
}
