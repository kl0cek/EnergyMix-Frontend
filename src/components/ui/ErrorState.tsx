import { Button } from './Button';
import { Card } from './Card';

interface ErrorStateProps {
  message: string | null;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="font-semibold text-ink">Nie udało się pobrać danych</p>
      {message && <p className="text-sm text-muted">{message}</p>}
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Spróbuj ponownie
        </Button>
      )}
    </Card>
  );
}
