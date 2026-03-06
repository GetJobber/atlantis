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

  test.describe("default avatar hover", () => {
    test("hover over default avatar shows shadow and darker background", async ({
      page,
    }) => {
      const defaultAvatarSection = page
        .locator("section")
        .filter({ hasText: "Default (no color)" });
      // Use .first() to target the Light mode avatar
      const iconAvatar = defaultAvatarSection
        .locator('[aria-label="Icon fallback"]')
        .first();

      await defaultAvatarSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await expect(iconAvatar).toBeVisible();
      await iconAvatar.hover();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot("avatar-default-hover.png", {
        fullPage: true,
      });
    });
  });
});
