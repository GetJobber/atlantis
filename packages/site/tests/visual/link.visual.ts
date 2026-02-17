import { expect, test } from "@playwright/test";

test.describe("Link Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/link");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("link components", async ({ page }) => {
    await expect(page).toHaveScreenshot("link-initial.png", {
      fullPage: true,
    });
  });

  test("link components focus and hover", async ({ page }) => {
    const link = page.getByRole("link", { name: "link", exact: true });
    await link.focus();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot("link-focus.png", {
      fullPage: true,
    });

    await link.blur();

    await link.hover();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot("link-hover.png", {
      fullPage: true,
    });
  });
});
