import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { nextTimeZone, resolveTimeZone, type TimeZonePref } from '@/utils/timezone';
import { TimezoneContext } from './TimezoneContext';

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<TimeZonePref>('uk');

  const cycle = useCallback(() => setPreference((prev) => nextTimeZone(prev)), []);

  const value = useMemo(
    () => ({ preference, timeZone: resolveTimeZone(preference), cycle }),
    [preference, cycle]
  );

  return <TimezoneContext.Provider value={value}>{children}</TimezoneContext.Provider>;
}
