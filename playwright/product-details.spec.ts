import test, { expect } from "@playwright/test";

test("should display the page title", async ({ page }) => {
  await page.goto("/product/1")

  await expect(page).toHaveTitle(/Product Details/i);
});
