import { expect, test } from "@playwright/test";

test("should display the page title", async ({ page }) => {
  await page.goto("/search")

  await expect(page).toHaveTitle(/Search/i);
});