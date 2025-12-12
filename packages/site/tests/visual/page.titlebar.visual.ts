import { expect, test } from "@playwright/test";

test.describe("Page TitleBar Responsive Visuals", () => {
  test("small viewport stacks actions", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/visual-tests/page");
    // Allow any initial layout/render to settle
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot("page-titlebar-small.png");
  });

  test("large viewport inlines actions", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/visual-tests/page");
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot("page-titlebar-large.png");
  });
});
