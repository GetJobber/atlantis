import { expect, test } from "@playwright/test";

test.describe("Atlantis Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
  });

  test("description list components", async ({ page }) => {
    await page.goto("http://localhost:5173/visual-tests/description-list");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(
      "visual-test-description-list-page.png",
      {
        fullPage: true,
      },
    );
  });
});
