import { expect, test } from '@playwright/test'
import { mockApi } from './mocks'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'en'))
})

test('renders the 3-day energy mix from the API', async ({ page }) => {
  await mockApi(page)
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Energy mix — 3 days' }),
  ).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Tomorrow' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Day after' })).toBeVisible()

  await expect(page.getByText('72%').first()).toBeVisible()

  await expect(page.getByText('Wind', { exact: true })).toBeVisible()
  await expect(page.getByText('Gas', { exact: true })).toBeVisible()
})

test('recalculates the charging window when the duration changes', async ({
  page,
}) => {
  await mockApi(page)
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Optimal charging window' }),
  ).toBeVisible()

  // Default 3 h → 73% (from the mock).
  await expect(page.getByText('73%')).toBeVisible()

  // Pick 5 h and recalculate → 75%.
  await page.getByRole('button', { name: '5', exact: true }).click()
  await page.getByRole('button', { name: 'Recalculate' }).click()

  await expect(page.getByText('75%')).toBeVisible()
})

test('shows skeletons while loading, then the full dashboard', async ({
  page,
}) => {
  // Slow API so the loading state is observable.
  await mockApi(page, { delayMs: 800 })
  await page.goto('/')

  await expect(page.locator('.animate-pulse').first()).toBeVisible()

  await expect(page.getByText('EnergyMix', { exact: true })).toBeVisible()
  await expect(page.getByText('Live data')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Tomorrow' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Day after' })).toBeVisible()
  for (const fuel of ['Nuclear', 'Imports', 'Coal', 'Other']) {
    await expect(page.getByText(fuel, { exact: true })).toBeVisible()
  }

  await expect(
    page.getByRole('heading', { name: 'Optimal charging window' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: '1', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '6', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Recalculate' })).toBeVisible()
  await expect(page.getByText('Best window')).toBeVisible()
  await expect(page.getByText('73%')).toBeVisible()
  await expect(page.getByText('Clean-energy forecast · next 48 h')).toBeVisible()
})
