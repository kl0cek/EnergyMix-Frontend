import { useContext } from 'react';
import { TimezoneContext } from '../context/TimezoneContext';
import type { TimezoneContextValue } from '../context/TimezoneContext';

export function useTimezone(): TimezoneContextValue {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
}
