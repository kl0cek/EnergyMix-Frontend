import type { ChargingWindowResult, DailyEnergyMix } from '@/types/energy';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? `Żądanie nie powiodło się (${res.status}).`);
  }
  const body = (await res.json()) as { data: T };
  return body.data;
}

export function fetchEnergyMix(): Promise<DailyEnergyMix[]> {
  return request<DailyEnergyMix[]>('/api/energy/mix');
}

export function fetchChargingWindow(hours: number): Promise<ChargingWindowResult> {
  return request<ChargingWindowResult>(`/api/energy/charging-window?hours=${hours}`);
}
