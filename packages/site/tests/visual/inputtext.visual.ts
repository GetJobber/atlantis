import { expect, test } from "@playwright/test";

test.describe("InputText Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/input-text");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-initial-page.png", {
      fullPage: true,
    });
  });

  test.describe("toolbar", () => {
    test("renders toolbar when focused and hides when blurred", async ({
      page,
    }) => {
      const input = page.getByRole("textbox", { name: "Toolbar example" });
      await input.click();
      await page.waitForTimeout(600);
      await expect(page).toHaveScreenshot("2-toolbar-focused.png", {
        fullPage: true,
      });
      await page.click("body");
      await page.waitForTimeout(600);
      await expect(page).toHaveScreenshot("3-toolbar-blurred.png", {
        fullPage: true,
      });
    });

    test("keeps toolbar open while user is holding pointer down, closes when released", async ({
      page,
    }) => {
      const input = page.getByRole("textbox", { name: "Toolbar example" });
      await input.click();
      const button = page.getByRole("button", {
        name: "Test toolbar stays open",
      });
      // Move mouse to hover on button
      await button.hover();
      await page.mouse.down();
      await page.waitForTimeout(600);
      await expect(page).toHaveScreenshot("4-toolbar-open-while-holding.png", {
        fullPage: true,
      });

      // Release left mouse button
      await page.mouse.up();
      await page.waitForTimeout(600);
      expect(await input.inputValue()).toBe("Button was clicked");
      await expect(page).toHaveScreenshot(
        "5-toolbar-closed-when-released.png",
        {
          fullPage: true,
        },
      );
    });
  });
});
