export const TIME_ZONE_PREFS = ['uk', 'local', 'utc'] as const;

export type TimeZonePref = (typeof TIME_ZONE_PREFS)[number];

export function resolveTimeZone(pref: TimeZonePref): string {
  switch (pref) {
    case 'uk':
      return 'Europe/London';
    case 'utc':
      return 'UTC';
    case 'local':
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}

export function nextTimeZone(pref: TimeZonePref): TimeZonePref {
  const index = TIME_ZONE_PREFS.indexOf(pref);
  return TIME_ZONE_PREFS[(index + 1) % TIME_ZONE_PREFS.length];
}
