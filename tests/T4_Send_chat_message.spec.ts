import { test, expect } from '@playwright/test';

test('Send Chat Message to Deja Brady', async ({ page }) => {

  await page.goto('https://minimals.cc/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/i);

  await page.getByRole('link', { name: 'Chat' }).click();
  await expect(page).toHaveURL(/dashboard\/chat/i);

  const chatItem = page.locator('text=Deja Brady').first();
  await chatItem.waitFor({ state: 'visible', timeout: 10000 });
  await chatItem.click();

  const messageBox = page.getByPlaceholder(/Type a message/i);
  await expect(messageBox).toBeVisible();
  await messageBox.fill('Hello');
  await messageBox.press('Enter');

  const sentMessage = page.locator('text=Hello').last();
  await expect(sentMessage).toBeVisible();
});
