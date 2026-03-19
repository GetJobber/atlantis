import { expect, test } from "@playwright/test";

test.describe("Button Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/button");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state - all button variants", async ({
    page,
  }) => {
    await expect(page).toHaveScreenshot("button-initial.png", {
      fullPage: true,
    });
  });

  test.describe("interactions", () => {
    test("should capture primary button hover state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "primary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-primary-work-hover.png", {
        fullPage: true,
      });
    });

    test("should capture primary button focus state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "primary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-primary-work-focus.png", {
        fullPage: true,
      });
    });

    test("should capture secondary button hover state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "secondary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-secondary-work-hover.png", {
        fullPage: true,
      });
    });

    test("should capture secondary button focus state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "secondary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-secondary-work-focus.png", {
        fullPage: true,
      });
    });

    test("should capture secondary subtle button hover state", async ({
      page,
    }) => {
      const button = page
        .getByRole("button", { name: "secondary subtle", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-secondary-subtle-hover.png", {
        fullPage: true,
      });
    });

    test("should capture secondary subtle button focus state", async ({
      page,
    }) => {
      const button = page
        .getByRole("button", { name: "secondary subtle", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-secondary-subtle-focus.png", {
        fullPage: true,
      });
    });

    test("should capture tertiary button hover state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "tertiary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-tertiary-work-hover.png", {
        fullPage: true,
      });
    });

    test("should capture tertiary button focus state", async ({ page }) => {
      const button = page
        .getByRole("button", { name: "tertiary work", exact: true })
        .first();
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-tertiary-work-focus.png", {
        fullPage: true,
      });
    });

    test("should capture icon-only button hover state", async ({ page }) => {
      const button = page.getByRole("button", { name: "Settings" });
      await button.first().scrollIntoViewIfNeeded();
      await button.first().hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-icon-only-hover.png", {
        fullPage: true,
      });
    });

    test("should capture icon-only button focus state", async ({ page }) => {
      const button = page.getByRole("button", { name: "Settings" });
      await button.first().scrollIntoViewIfNeeded();
      await button.first().focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot("button-icon-only-focus.png", {
        fullPage: true,
      });
    });
  });
});
