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
      const tooltipTrigger = await page.getByRole("button", { name: "Top" });
      await tooltipTrigger.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("top-tooltip.png", {
        fullPage: true,
      });
    });

    test("bottom", async ({ page }) => {
      const tooltipTrigger = await page.getByRole("button", { name: "Bottom" });
      await tooltipTrigger.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("bottom-tooltip.png", {
        fullPage: true,
      });
    });

    test("right", async ({ page }) => {
      const tooltipTrigger = await page.getByRole("button", { name: "Right" });
      await tooltipTrigger.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("right-tooltip.png", {
        fullPage: true,
      });
    });

    test("left", async ({ page }) => {
      const tooltipTrigger = await page.getByRole("button", { name: "Left" });
      await tooltipTrigger.hover();
      await expect(page.getByRole("tooltip")).toBeVisible();
      await expect(page).toHaveScreenshot("left-tooltip.png", {
        fullPage: true,
      });
    });
  });

  test("large text", async ({ page }) => {
    const tooltipTrigger = await page.getByRole("button", {
      name: "Long Message",
    });
    await tooltipTrigger.hover();
    await expect(page.getByRole("tooltip")).toBeVisible();
    await expect(page).toHaveScreenshot("large-text-tooltip.png", {
      fullPage: true,
    });
  });

  test.describe("offscreen and within a scrollable container", () => {
    test("tooltip should not be visible", async ({ page }) => {
      const tooltipTrigger = await page.getByRole("button", {
        name: "Offscreen",
      });
      const scrollableContainer = page.getByTestId("scrollable-container");

      // Focusing the button brings the tooltip into view
      await tooltipTrigger.focus();
      await expect(page.getByRole("tooltip")).toBeVisible();

      // Scrolling the button out of view should hide the tooltip
      await scrollableContainer.evaluate(el => {
        el.scrollTop = 0;
      });
      await expect(page.getByRole("tooltip")).not.toBeVisible();

      await expect(page).toHaveScreenshot("offscreen-tooltip.png", {
        fullPage: true,
      });
    });
  });
});
