import { expect, test } from "@playwright/test";

test.describe("Theme Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/theme");
    await page.waitForTimeout(600);
  });

  test("initial light view", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-theme-initial.png", {
      fullPage: true,
    });
  });

  test("toggle to dark and capture", async ({ page }) => {
    await page.getByRole("button").first().click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot("2-theme-dark.png", {
      fullPage: true,
    });
  });
});
