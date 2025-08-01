import { test, expect } from '@playwright/test';

test('Search Order: Filter for Cortez Herring', async ({ page }) => {

  await page.goto('https://minimals.cc/');
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/i);

  await page.getByRole('button', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'List' }).click();

  const searchBox = page.getByPlaceholder('Search customer or order number...');
await searchBox.fill('cor');
await searchBox.press('Enter');

  const rows = page.locator('table tbody tr').filter({ hasText: 'Cortez Herring' });
await expect(rows).toHaveCount(1);
await expect(rows.first()).toContainText('Cortez Herring');
});
