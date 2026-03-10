import { expect, test } from "@playwright/test";

const screenshotOptions = {
  animations: "disabled" as const,
  caret: "hide" as const,
  fullPage: true,
};

test.describe("InputText Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/input-text");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot(
      "1-initial-page.png",
      screenshotOptions,
    );
  });

  test("multiline v1: text stays at top after wrapper is resized", async ({
    page,
  }) => {
    const section = page.getByTestId("multiline-resize-section");
    const wrapper = section.locator('[data-testid="Form-Field-Wrapper"]');

    await expect(wrapper).toBeVisible();

    await expect(section).toHaveScreenshot(
      "2-multiline-before-resize.png",
      screenshotOptions,
    );

    await wrapper.evaluate(el => {
      el.style.height = "300px";
    });
    await page.waitForTimeout(200);

    await expect(section).toHaveScreenshot(
      "3-multiline-after-resize.png",
      screenshotOptions,
    );
  });

  test("multiline v2: text stays at top after wrapper is resized", async ({
    page,
  }) => {
    const section = page.getByTestId("multiline-resize-v2-section");
    const wrapper = section.locator('[data-testid="Form-Field-Wrapper"]');

    await expect(wrapper).toBeVisible();

    await expect(section).toHaveScreenshot(
      "4-multiline-v2-before-resize.png",
      screenshotOptions,
    );

    await wrapper.evaluate(el => {
      el.style.height = "300px";
    });
    await page.waitForTimeout(200);

    await expect(section).toHaveScreenshot(
      "5-multiline-v2-after-resize.png",
      screenshotOptions,
    );
  });
});
