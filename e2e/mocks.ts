import type { Page } from '@playwright/test'

function day(date: string, clean: number) {
  const fossil = 100 - clean
  return {
    date,
    intervals: 48,
    cleanEnergyPercent: clean,
    generationMix: {
      wind: clean - 25,
      nuclear: 15,
      solar: 5,
      hydro: 3,
      biomass: 2,
      gas: fossil - 8,
      imports: 5,
      coal: 2,
      other: 1,
    },
  }
}

const MIX = {
  data: [day('2026-07-06', 72), day('2026-07-07', 63), day('2026-07-08', 49)],
}

function series() {
  const points = []
  const start = Date.UTC(2026, 6, 6, 0, 0)
  for (let i = 0; i < 96; i += 1) {
    points.push({
      time: new Date(start + i * 30 * 60_000).toISOString(),
      cleanPercent: 40 + (i % 20),
    })
  }
  return points
}

// Average clean energy depends on the requested length so the recalculate
// interaction is observable: 3h -> 73%, 5h -> 75%.
function windowFor(hours: number) {
  return {
    windowHours: hours,
    start: '2026-07-06T14:00Z',
    end: '2026-07-06T17:00Z',
    averageCleanEnergyPercent: 70 + hours,
    series: series(),
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function mockApi(page: Page, { delayMs = 0 } = {}) {
  await page.route('**/api/energy/mix', async (route) => {
    if (delayMs) await wait(delayMs)
    await route.fulfill({ json: MIX })
  })

  await page.route('**/api/energy/charging-window*', async (route) => {
    if (delayMs) await wait(delayMs)
    const hours =
      Number(new URL(route.request().url()).searchParams.get('hours')) || 3
    await route.fulfill({ json: { data: windowFor(hours) } })
  })
}
