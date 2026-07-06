import { Badge, ThemeToggle } from '../ui';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-xl font-bold text-ink">EnergyMix</div>
          <div className="text-sm text-muted">
            Miks energetyczny - Wielka Brytania
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="live">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Dane na żywo
        </Badge>
        <ThemeToggle />
      </div>
    </header>
  );
}
