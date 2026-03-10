import { expect, test } from "@playwright/test";

test.describe("DataTable Atoms Row Interactivity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/data-table-atoms");
    await page.waitForTimeout(500);
  });

  test("non-interactive row has default cursor on hover", async ({ page }) => {
    const nonInteractiveRow = page
      .getByTestId("datatable-atoms-non-interactive")
      .locator("tbody tr")
      .first();

    await nonInteractiveRow.hover();

    const cursor = await nonInteractiveRow.evaluate(
      el => getComputedStyle(el).cursor,
    );
    expect(["default", "auto"]).toContain(cursor);
  });

  test("non-interactive row has no hover background on hover", async ({
    page,
  }) => {
    const nonInteractiveRow = page
      .getByTestId("datatable-atoms-non-interactive")
      .locator("tbody tr")
      .first();

    await nonInteractiveRow.hover();

    const backgroundColor = await nonInteractiveRow.evaluate(
      el => getComputedStyle(el).backgroundColor,
    );
    // No hover style; background should be transparent
    expect(["transparent", "rgba(0, 0, 0, 0)"]).toContain(backgroundColor);
  });

  test("interactive row has pointer cursor on hover", async ({ page }) => {
    const interactiveRow = page
      .getByTestId("datatable-atoms-interactive")
      .locator("tbody tr")
      .first();

    await interactiveRow.hover();

    const cursor = await interactiveRow.evaluate(
      el => getComputedStyle(el).cursor,
    );
    expect(cursor).toBe("pointer");
  });

  test("interactive row has hover background", async ({ page }) => {
    const interactiveRow = page
      .getByTestId("datatable-atoms-interactive")
      .locator("tbody tr")
      .first();

    await interactiveRow.scrollIntoViewIfNeeded();
    await interactiveRow.hover();
    await page.waitForTimeout(200);

    // Screenshot validates hover appearance including correct token color
    await expect(page).toHaveScreenshot(
      "datatable-atoms-interactive-row-hover.png",
      { fullPage: true },
    );
  });

  test("footer row has default cursor on hover", async ({ page }) => {
    const footerRow = page
      .getByTestId("datatable-atoms-interactive")
      .locator("tfoot tr")
      .first();

    await footerRow.hover();

    const cursor = await footerRow.evaluate(el => getComputedStyle(el).cursor);
    expect(["default", "auto"]).toContain(cursor);
  });
});
