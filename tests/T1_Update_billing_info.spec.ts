import { test, expect } from '@playwright/test';

test('Update billing information', async ({ page }) => {

  await page.goto('https://minimals.cc/');
  await page.waitForLoadState('domcontentloaded');

  //await signInPage.getByPlaceholder('Email address').fill('demo@minimals.cc');
  //await signInPage.getByPlaceholder('Password').fill('@2Minimal');
  //Email & password are getting Autofill thats why commenting this

  await page.getByRole('link', { name: 'Sign in' }).click();
  await Promise.all([
    page.waitForURL('**/dashboard'),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);
  await expect(page).toHaveURL(/dashboard/i);

  await page.getByRole('button', { name: 'User' }).click();
  await page.getByRole('link', { name: 'Account' }).click();
  await page.getByRole('tab', { name: 'Billing' }).click();

  await page.getByRole('button', { name: 'Jayvion Simon' }).click();
  const billingInput = page.getByPlaceholder('Billing Name');
  await billingInput.fill('Deja Brady');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('heading', { name: '**** **** **** 1234' }).click();
  const saveButton = page.getByRole('button', { name: 'Save Changes' });
  if (await saveButton.isVisible()) {
    await saveButton.click();
  }

  await expect(page.getByRole('button', { name: 'Deja Brady' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '**** **** **** 1234' })).toHaveClass(/selected|active|checked/);
}, { timeout: 30000 });
