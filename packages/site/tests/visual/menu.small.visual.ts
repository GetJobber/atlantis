import { expect, test } from "@playwright/test";

test.describe("Menu Small-Screen Visual", () => {
  test("small viewport opens bottom sheet", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/visual-tests/menu-small");
    await page.getByRole("button", { name: "Open" }).click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot("menu-small-open.png");
  });

  test("sticky footer regression: scroll a bit then open", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/visual-tests/menu-small-sticky");
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.getByRole("button", { name: "Sticky Open" }).click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot("menu-small-sticky-open.png");
  });
});
