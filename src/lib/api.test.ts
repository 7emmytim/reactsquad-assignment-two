import { expect, test } from "@playwright/test";
import { BASE_URL } from "./constants";

test.describe("API mocks using Playwright", () => {
  test("should render products from mocked API", async ({ page }) => {
    await page.route(`${BASE_URL}?limit=6`, async (route) => {
      const mockProducts = {
        products: [
          { id: 1, title: "Mock Phone", price: 299 },
          { id: 2, title: "Mock Laptop", price: 899 },
        ],
      };
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockProducts),
      });
    });

    await page.goto("/experiments/pricing");

    await expect(page.getByText("Mock Phone")).toBeVisible();
    await expect(page.getByText("Mock Laptop")).toBeVisible();
  });

  test("should mock searchProducts() response", async ({ page }) => {
    await page.route(`${BASE_URL}/search?q=phone`, async (route) => {
      const mockResponse = {
        products: [{ id: 1, title: "Mocked Search Phone" }],
      };
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });

    await page.goto("/search?q=phone");

    await expect(page.getByText("Mocked Search Phone")).toBeVisible();
  });

  test("should mock fetchCategories()", async ({ page }) => {
    await page.route(`${BASE_URL}/categories`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(["smartphones", "laptops"]),
      });
    });

    await page.goto("/search?q=xyz");
    await expect(page.getByText("smartphones")).toBeVisible();
    await expect(page.getByText("laptops")).toBeVisible();
  });
});


test.describe("Fallback to categories when no products found", () => {
  test("should show categories when search returns no products", async ({ page }) => {
    await page.route(`${BASE_URL}/search?q=nonexistent`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ products: [] }),
      });
    });

    await page.route(`${BASE_URL}/categories`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(["smartphones", "laptops", "accessories"]),
      });
    });

    await page.goto("/search?q=nonexistent");

    await expect(page.getByText("smartphones")).toBeVisible();
    await expect(page.getByText("laptops")).toBeVisible();
    await expect(page.getByText("accessories")).toBeVisible();

    await expect(page.getByText(/No results found for “nonexistent”/i)).toBeVisible();
  });
});
