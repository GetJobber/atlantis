import { type Page, expect, test } from "@playwright/test";

// Helper to focus the first combobox and open menu
async function openFirstAutocomplete(page: Page) {
  const first = page.getByRole("combobox").first();
  await first.click();
  await page.waitForTimeout(200);
}

// Move highlight down by n
async function moveDown(page: Page, n = 1) {
  for (let i = 0; i < n; i++) {
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(50);
  }
}

const screenshotOptions = {
  animations: "disabled" as const,
  caret: "hide" as const,
  fullPage: true,
};

test.describe("Autocomplete v2 Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/autocomplete-v2");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.waitForTimeout(500);
  });

  test("initial page", async ({ page }) => {
    await expect(page).toHaveScreenshot(
      "1-initial-autocomplete-v2.png",
      screenshotOptions,
    );
  });

  test.describe("flat lists", () => {
    test("flat: options only - open and highlight second", async ({ page }) => {
      await openFirstAutocomplete(page);
      await moveDown(page, 2);
      await expect(page).toHaveScreenshot(
        "2-flat-options-open-highlight.png",
        screenshotOptions,
      );
    });

    test("flat: options + actions - open and highlight first action", async ({
      page,
    }) => {
      // Second combobox on page
      const second = page.getByRole("combobox").nth(1);
      await second.click();
      await page.waitForTimeout(200);
      // 4 options, then actions → move to first action
      await moveDown(page, 5);
      await expect(page).toHaveScreenshot(
        "3-flat-options-actions-open-highlight.png",
        screenshotOptions,
      );
    });

    test("flat: options + interactive footer - open and highlight footer", async ({
      page,
    }) => {
      const third = page.getByRole("combobox").nth(2);
      await third.click();
      await page.waitForTimeout(200);
      // 4 options then footer action
      await moveDown(page, 5);
      await expect(page).toHaveScreenshot(
        "4-flat-options-footer-open-highlight.png",
        screenshotOptions,
      );
    });
  });

  test.describe("sectioned lists", () => {
    test("sectioned: options only - open and highlight first option", async ({
      page,
    }) => {
      // Next row, first in section
      const fourth = page.getByRole("combobox").nth(3);
      await fourth.click();
      await page.waitForTimeout(200);
      await moveDown(page, 1);
      await expect(page).toHaveScreenshot(
        "5-sectioned-options-only-open.png",
        screenshotOptions,
      );
    });

    test("sectioned: options + actions - open and highlight section action", async ({
      page,
    }) => {
      const fifth = page.getByRole("combobox").nth(4);
      await fifth.click();
      await page.waitForTimeout(200);
      // move to first section action (after options)
      await moveDown(page, 5);
      await expect(page).toHaveScreenshot(
        "6-sectioned-actions-open-highlight.png",
        screenshotOptions,
      );
    });

    test("sectioned: header + options + actions + footer - open and highlight footer", async ({
      page,
    }) => {
      const sixth = page.getByRole("combobox").nth(5);
      await sixth.click();
      await page.waitForTimeout(200);
      // header(1) + indoor options(4) + section action(1) + outdoor options(4) + footer(1)
      await moveDown(page, 11);
      await expect(page).toHaveScreenshot(
        "7-sectioned-header-footer-open-highlight.png",
        screenshotOptions,
      );
    });
  });

  test.describe("states", () => {
    test("loading state", async ({ page }) => {
      const seventh = page.getByRole("combobox").nth(6);
      await seventh.click();
      await expect(page.getByRole("listbox")).toBeVisible();
      await expect(page.getByTestId("ATL-Glimmer").first()).toBeVisible();
      await expect(page).toHaveScreenshot(
        "8-loading-open.png",
        screenshotOptions,
      );
    });

    test("empty: simple (no header/footer)", async ({ page }) => {
      const eighth = page.getByRole("combobox").nth(7);
      await eighth.click();
      await expect(page.getByRole("listbox")).toBeVisible();
      await expect(page).toHaveScreenshot(
        "9-empty-simple-open.png",
        screenshotOptions,
      );
    });

    test("empty: header + interactive footer", async ({ page }) => {
      const ninth = page.getByRole("combobox").nth(8);
      await ninth.click();
      await page.waitForTimeout(200);
      await moveDown(page, 2); // move highlight to footer action
      await expect(page).toHaveScreenshot(
        "10-empty-header-footer-open-highlight.png",
        screenshotOptions,
      );
    });
  });

  test("with selection: open shows selection highlighted", async ({ page }) => {
    const tenth = page.getByRole("combobox").nth(9);
    await tenth.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot(
      "11-selection-open-highlight.png",
      screenshotOptions,
    );
  });

  test("constrained space: open near bottom and verify layout", async ({
    page,
  }) => {
    // The constrained example is the last combobox
    const last = page.getByRole("combobox").last();
    await last.click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(
      "12-constrained-open.png",
      screenshotOptions,
    );
  });
});
