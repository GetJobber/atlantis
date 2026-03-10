import { expect, test } from "@playwright/test";

test.describe("Avatar Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/avatar");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("avatar-initial.png", {
      fullPage: true,
    });
  });
});
