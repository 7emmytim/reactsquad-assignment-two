import { expect, test } from "@playwright/test";

test("should display the page title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Home/i);
});

test('should render layout', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Experiments' })).toBeVisible();
});