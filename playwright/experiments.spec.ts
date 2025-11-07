import { expect, test } from "@playwright/test";

test("should display the page title", async ({ page }) => {
  await page.goto("/experiments/pricing")

  await expect(page).toHaveTitle(/Experiments/i);
});

// given: any user visits the experiments page, should: render the reset experiment button
test('should render reset experiment button', async ({ page }) => {
  await page.goto('/experiments/pricing');

  await expect(page.getByRole('link', { name: 'Reset Experiment' })).toBeVisible();
});