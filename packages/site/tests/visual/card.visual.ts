import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 1000 } });
test.describe("Card Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/card");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test.describe("clickable card interactions", () => {
    test("hover over link card", async ({ page }) => {
      const linkCard = page
        .locator("section")
        .filter({ hasText: "Clickable Cards" })
        .getByRole("link");

      await linkCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await expect(linkCard).toBeVisible();
      await linkCard.hover();
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot("card-link-hover.png", {
        fullPage: true,
      });
    });

    test("hover over clickable card with onClick", async ({ page }) => {
      const clickableCard = page
        .locator("section")
        .filter({ hasText: "Clickable Cards" })
        .getByRole("button");

      await clickableCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await expect(clickableCard).toBeVisible();
      await clickableCard.hover();
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot("card-clickable-hover.png", {
        fullPage: true,
      });
    });
  });

  test.describe("header action interactions", () => {
    test("hover over header action button", async ({ page }) => {
      const headerActionButton = page
        .locator("section")
        .filter({ hasText: "Header Actions" })
        .getByRole("button", { name: "Configure settings" });

      await headerActionButton.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await expect(headerActionButton).toBeVisible();
      await headerActionButton.hover();
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot("card-header-action-hover.png", {
        fullPage: true,
      });
    });
  });
});
