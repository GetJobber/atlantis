import { expect, test } from "@playwright/test";

test.describe("DatePicker Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/datepicker");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("click to open basic datepicker", async ({ page }) => {
    const basicActivator = page
      .locator("section")
      .filter({ hasText: "Basic DatePicker" })
      .getByRole("button", { name: "Open Datepicker" });

    await basicActivator.click();
    await page.waitForSelector(".react-datepicker__month");
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot("datepicker-open.png", {
      fullPage: true,
    });
  });

  // eslint-disable-next-line max-statements
  test("enter to open datepicker and arrow keys to focus", async ({ page }) => {
    const interactionActivator = page
      .locator("section")
      .filter({ hasText: "Interaction Test" })
      .getByRole("button", { name: "Interaction Test" });

    await interactionActivator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(interactionActivator).toBeVisible();
    await interactionActivator.focus();

    await expect(page).toHaveScreenshot("activator-focused.png", {
      fullPage: true,
    });

    await page.keyboard.press("Enter");
    await page.waitForSelector(".react-datepicker__month");

    await expect(page).toHaveScreenshot("calendar-opened-via-keyboard.png", {
      fullPage: true,
    });

    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot("keyboard-navigation.png", {
      fullPage: true,
    });
  });

  // eslint-disable-next-line max-statements
  test("hover over days", async ({ page }) => {
    const hoverActivator = page
      .locator("section")
      .filter({ hasText: "Interaction Test" })
      .getByRole("button", { name: "Interaction Test" });

    await hoverActivator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(hoverActivator).toBeVisible();
    await hoverActivator.click();
    await page.waitForSelector(".react-datepicker__month");

    const popup = page.locator(".react-datepicker-popper");
    const outsideDays = popup.locator(".react-datepicker__day--outside-month");

    await outsideDays.first().hover();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot("hover-outside-day.png", {
      fullPage: true,
    });

    const regularDay = popup.locator(
      ".react-datepicker__day:not(.react-datepicker__day--outside-month)",
    );
    await regularDay.first().hover();
    await expect(page).toHaveScreenshot("hover-regular-day.png", {
      fullPage: true,
    });
  });

  test("positioning when bottom lacks space", async ({ page }) => {
    const positionActivator = page
      .locator("section")
      .filter({ hasText: "Position Test" })
      .getByRole("button", { name: "Position Test" });

    await positionActivator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await positionActivator.click();
    await page.waitForSelector(".react-datepicker-popper");
    await page.waitForTimeout(300);

    const popper = page.locator(".react-datepicker-popper");
    await expect(popper).toBeVisible();

    await expect(page).toHaveScreenshot("position-upward.png", {
      fullPage: true,
    });
  });
});
