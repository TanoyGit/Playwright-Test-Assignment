import { test, expect } from '@playwright/test';

test('Filter Jobs by On Demand employment type', async ({ page }) => {
  
  await page.goto('https://minimals.cc/');

  //Email & password are getting Autofill

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/i);

  await page.getByRole('button', { name: 'Job' }).click();
  await page.getByRole('link', { name: 'List' }).click();

  await page.getByRole('button', { name: 'Filters' }).click();
  await expect(page.locator('[role="complementary"]')).toBeVisible();

  await page.getByLabel('On Demand').check();

  await page.getByRole('button', { name: /close|x/i }).click(); 

  const jobRows = page.locator('table tbody tr');

  const count = await jobRows.count();
  for (let i = 0; i < count; i++) {
    const row = jobRows.nth(i);
    await expect(row).toContainText('On Demand');
  }
});
