import { test, expect } from '@playwright/test';

test('Delete all files from File Manager', async ({ page }) => {

  await page.goto('https://minimals.cc/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/i);

  await page.getByRole('link', { name: 'File manager' }).click();
  await expect(page).toHaveURL(/dashboard\/file-manager/i);

  const selectAllCheckbox = page.getByRole('checkbox', { name: 'All row Checkbox' });
  await expect(selectAllCheckbox).toBeVisible();
  await selectAllCheckbox.check();

  const deleteButton = page.getByRole('button', { name: /delete|trash|remove/i });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();

  const fileRows = page.locator('table tbody tr');
  await expect(fileRows).toHaveCount(0);
});
