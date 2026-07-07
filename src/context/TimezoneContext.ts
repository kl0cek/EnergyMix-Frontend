import { createContext } from 'react';
import type { TimeZonePref } from '@/utils/timezone';

export interface TimezoneContextValue {
  preference: TimeZonePref;
  timeZone: string;
  cycle: () => void;
}

export const TimezoneContext = createContext<TimezoneContextValue | null>(null);
