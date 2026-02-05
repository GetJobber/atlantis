import { expect, test } from "@playwright/test";

test.describe("Tooltip Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/tooltip");
    await page.waitForTimeout(500);
    await page.setViewportSize({ width: 1024, height: 1000 });
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("initial-page.png", {
      fullPage: true,
    });
  });

  test.describe("tooltip positions", () => {
    test("top", async ({ page }) => {
      const tooltip = await page.getByRole("button", { name: "Top" });
      await tooltip.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("top-tooltip.png", {
        fullPage: true,
      });
    });

    test("bottom", async ({ page }) => {
      const tooltip = await page.getByRole("button", { name: "Bottom" });
      await tooltip.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("bottom-tooltip.png", {
        fullPage: true,
      });
    });

    test("right", async ({ page }) => {
      const tooltip = await page.getByRole("button", { name: "Right" });
      await tooltip.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("right-tooltip.png", {
        fullPage: true,
      });
    });

    test("left", async ({ page }) => {
      const tooltip = await page.getByRole("button", { name: "Left" });
      await tooltip.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("left-tooltip.png", {
        fullPage: true,
      });
    });
  });

  test("large text", async ({ page }) => {
    const tooltip = await page.getByRole("button", { name: "Long Message" });
    await tooltip.hover();
    await expect(page.getByRole("tooltip")).toBeVisible();
    await expect(page).toHaveScreenshot("large-text-tooltip.png", {
      fullPage: true,
    });
  });

  test.describe("offscreen and within a scrollable container", () => {
    test("tooltip should not be visible", async ({ page }) => {
      const tooltip = await page.getByRole("button", { name: "Offscreen" });
      const scrollableContainer = page.getByTestId("scrollable-container");
      await tooltip.focus();
      await scrollableContainer.evaluate(el => {
        el.scrollTop = 0;
      });

      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("offscreen-tooltip.png", {
        fullPage: true,
      });
    });
  });
});
