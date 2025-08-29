import { expect, test } from "@playwright/test";

test.describe("Menu Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/menu");
    await page.waitForTimeout(800);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-menu-initial.png", {
      fullPage: true,
    });
  });

  test.describe("corner menus", () => {
    test("top left open/close", async ({ page }) => {
      await page
        .getByRole("button", { name: "Top Left Menu", exact: true })
        .click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("2-menu-top-left-open.png", {
        fullPage: true,
      });

      // click overlay to close
      await page.mouse.click(5, 5);
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("3-menu-top-left-closed.png", {
        fullPage: true,
      });
    });

    test("top right open/close", async ({ page }) => {
      await page
        .getByRole("button", { name: "Top Right Menu", exact: true })
        .click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("4-menu-top-right-open.png", {
        fullPage: true,
      });

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("5-menu-top-right-closed.png", {
        fullPage: true,
      });
    });

    test("bottom left open/close", async ({ page }) => {
      await page
        .getByRole("button", { name: "Bottom Left Menu", exact: true })
        .click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("6-menu-bottom-left-open.png", {
        fullPage: true,
      });

      await page.mouse.click(5, 5);
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("7-menu-bottom-left-closed.png", {
        fullPage: true,
      });
    });

    test("bottom right open/close", async ({ page }) => {
      await page
        .getByRole("button", { name: "Bottom Right Menu", exact: true })
        .click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("8-menu-bottom-right-open.png", {
        fullPage: true,
      });

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("9-menu-bottom-right-closed.png", {
        fullPage: true,
      });
    });
  });
});
