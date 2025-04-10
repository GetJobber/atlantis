import { expect, test } from "@playwright/test";

test.describe("Button Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
  });

  test("primary layouts", async ({ page }) => {
    await page.goto("http://localhost:5173/visual-tests/layout");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("visual-test-layout-page.png", {
      fullPage: true,
    });
  });

  test("primary components", async ({ page }) => {
    await page.goto("http://localhost:5173/visual-tests/components");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("visual-test-components-page.png", {
      fullPage: true,
    });
  });
});
