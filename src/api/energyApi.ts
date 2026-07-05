import type { ChargingWindowResult, DailyEnergyMix } from '../types/energy';
import { mockChargingWindow, mockEnergyMix } from './mockData';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const MOCK_LATENCY_MS = 600;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS));
}

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
  if (!API_URL) return delay(mockEnergyMix());
  return request<DailyEnergyMix[]>('/api/energy/mix');
}

export function fetchChargingWindow(hours: number): Promise<ChargingWindowResult> {
  if (!API_URL) return delay(mockChargingWindow(hours));
  return request<ChargingWindowResult>(`/api/energy/charging-window?hours=${hours}`);
}
