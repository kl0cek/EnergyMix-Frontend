const RELATIVE_DAY_LABELS = ['Dzisiaj', 'Jutro', 'Pojutrze'];

export function relativeDayLabel(index: number): string {
  return RELATIVE_DAY_LABELS[index] ?? '';
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function formatWeekdayDate(iso: string): string {
  return new Intl.DateTimeFormat('pl-PL', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
