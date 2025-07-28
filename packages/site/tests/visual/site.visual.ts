import { expect, test } from "@playwright/test";

test.describe("Atlantis Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
  });

  test.describe("layout components", () => {
    /*
    We have a font rendering issue between local and CI with JobberPro.
    Instead of slowing down this PR, we're commenting out for now.
   */
    test("primary layouts", async ({ page }) => {
      await page.goto("/visual-tests/layout");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-layout-page.png", {
        fullPage: true,
      });
    });

    test("grid components", async ({ page }) => {
      await page.goto("/visual-tests/grid");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-grid-page.png", {
        fullPage: true,
      });
    });
    /*

    We have a font rendering issue between local and CI with JobberPro.
    Instead of slowing down this PR, we're commenting out for now.
 */
    test("divider components", async ({ page }) => {
      await page.goto("/visual-tests/divider");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-divider-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("interactive components", () => {
    /*
    We have a font rendering issue between local and CI with JobberPro.
    Instead of slowing down this PR, we're commenting out for now.
    test("primary components", async ({ page }) => {
      await page.goto("/visual-tests/components");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-components-page.png", {
        fullPage: true,
      });
    });
     */

    test("modal components", async ({ page }) => {
      await page.goto("/visual-tests/modal");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-modal-page.png", {
        fullPage: true,
      });
    });

    test("drawer components", async ({ page }) => {
      await page.goto("/visual-tests/drawer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-drawer-page.png", {
        fullPage: true,
      });
    });

    test("disclosure components", async ({ page }) => {
      await page.goto("/visual-tests/disclosure");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-disclosure-page.png", {
        fullPage: true,
      });
    });

    test("side drawer components", async ({ page }) => {
      await page.goto("/visual-tests/side-drawer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-side-drawer-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("banner components", () => {
    test("banner components", async ({ page }) => {
      await page.goto("/visual-tests/banner");
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot("visual-test-banner-page.png", {
        fullPage: true,
      });
    });

    test("banner components (small window)", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 1000 });
      await page.goto("/visual-tests/banner");
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot("visual-test-banner-small-page.png", {
        fullPage: true,
      });
    });

    test("banner components (medium window)", async ({ page }) => {
      await page.setViewportSize({ width: 550, height: 1000 });
      await page.goto("/visual-tests/banner");
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot(
        "visual-test-banner-medium-page.png",
        {
          fullPage: true,
        },
      );
    });
  });

  test.describe("form components", () => {
    test("form field components", async ({ page }) => {
      await page.goto("/visual-tests/form-field");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-form-field-page.png", {
        fullPage: true,
      });
    });

    test("autocomplete components", async ({ page }) => {
      await page.goto("/visual-tests/autocomplete");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-autocomplete-page.png", {
        fullPage: true,
      });
    });

    test("combobox components", async ({ page }) => {
      await page.goto("/visual-tests/combobox");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-combobox-page.png", {
        fullPage: true,
      });
    });

    test("datepicker components", async ({ page }) => {
      await page.goto("/visual-tests/datepicker");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-datepicker-page.png", {
        fullPage: true,
      });
    });

    test("radio group components", async ({ page }) => {
      await page.goto("/visual-tests/radio-group");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-radio-group-page.png", {
        fullPage: true,
      });
    });

    test("segmented control components", async ({ page }) => {
      await page.goto("/visual-tests/segmented-control");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-segmented-control-page.png",
        {
          fullPage: true,
        },
      );
    });

    test("select components", async ({ page }) => {
      await page.goto("/visual-tests/select");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-select-page.png", {
        fullPage: true,
      });
    });

    /*

    We have a font rendering issue between local and CI with JobberPro. Instead of slowing down this PR, we're commenting out for now.

    test("emphasis components", async ({ page }) => {
      await page.goto("/visual-tests/emphasis");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-emphasis-page.png", {
        fullPage: true,
      });
    }); */

    test("glimmer components", async ({ page }) => {
      await page.goto("/visual-tests/glimmer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-glimmer-page.png", {
        fullPage: true,
      });
    });

    test("switch components", async ({ page }) => {
      await page.goto("/visual-tests/switch");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-switch-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("data display components", () => {
    test("datalist components", async ({ page }) => {
      await page.goto("/visual-tests/datalist");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-datalist-page.png", {
        fullPage: true,
      });
    });

    test("description list components", async ({ page }) => {
      await page.goto("/visual-tests/description-list");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-description-list-page.png",
        {
          fullPage: true,
        },
      );
    });

    test("gallery components", async ({ page }) => {
      await page.goto("/visual-tests/gallery");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-gallery-page.png", {
        fullPage: true,
      });
    });

    test("table components", async ({ page }) => {
      await page.goto("/visual-tests/table");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-table-page.png", {
        fullPage: true,
      });
    });

    test("data table components", async ({ page }) => {
      await page.goto("/visual-tests/data-table");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-data-table-page.png", {
        fullPage: true,
      });
    });

    test("tabs components", async ({ page }) => {
      await page.goto("/visual-tests/tabs");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-tabs-page.png", {
        fullPage: true,
      });
    });

    test("toast components", async ({ page }) => {
      await page.goto("/visual-tests/toast");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-toast-page.png", {
        fullPage: true,
      });
    });

    test("tooltip components", async ({ page }) => {
      await page.goto("/visual-tests/tooltip");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-tooltip-page.png", {
        fullPage: true,
      });
    });

    /*

    We have a font rendering issue between local and CI with JobberPro.
    Instead of slowing down this PR, we're commenting out for now.
    test("typography components", async ({ page }) => {
      await page.goto("/visual-tests/typography");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-typography-page.png", {
        fullPage: true,
      });
    });
 */
  });

  test.describe("selection components", () => {
    test("chip components", async ({ page }) => {
      await page.goto("/visual-tests/chip");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-chip-page.png", {
        fullPage: true,
      });
    });

    test("chips components", async ({ page }) => {
      await page.goto("/visual-tests/chips");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-chips-page.png", {
        fullPage: true,
      });
    });

    test("feature switch components", async ({ page }) => {
      await page.goto("/visual-tests/feature-switch");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-feature-switch-page.png",
        {
          fullPage: true,
        },
      );
    });
  });

  test.describe("input components", () => {
    test("inline label components", async ({ page }) => {
      await page.goto("/visual-tests/inline-label");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-inline-label-page.png", {
        fullPage: true,
      });
    });

    test("input date components", async ({ page }) => {
      await page.goto("/visual-tests/input-date");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-date-page.png", {
        fullPage: true,
      });
    });

    test("input email components", async ({ page }) => {
      await page.goto("/visual-tests/input-email");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-email-page.png", {
        fullPage: true,
      });
    });

    test("input file components", async ({ page }) => {
      await page.goto("/visual-tests/input-file");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-file-page.png", {
        fullPage: true,
      });
    });

    test("input group components", async ({ page }) => {
      await page.goto("/visual-tests/input-group");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-group-page.png", {
        fullPage: true,
      });
    });

    test("input number components", async ({ page }) => {
      await page.goto("/visual-tests/input-number");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-number-page.png", {
        fullPage: true,
      });
    });

    test("input password components", async ({ page }) => {
      await page.goto("/visual-tests/input-password");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-input-password-page.png",
        {
          fullPage: true,
        },
      );
    });

    test("input phone number components", async ({ page }) => {
      await page.goto("/visual-tests/input-phone-number");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-input-phone-number-page.png",
        {
          fullPage: true,
        },
      );
    });

    test("input text components", async ({ page }) => {
      await page.goto("/visual-tests/input-text");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-text-page.png", {
        fullPage: true,
      });
    });

    test("input time components", async ({ page }) => {
      await page.goto("/visual-tests/input-time");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-time-page.png", {
        fullPage: true,
      });
    });

    test("input validation components", async ({ page }) => {
      await page.goto("/visual-tests/input-validation");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(
        "visual-test-input-validation-page.png",
        {
          fullPage: true,
        },
      );
    });
  });

  test.describe("utility components", () => {
    test("lightbox components", async ({ page }) => {
      await page.goto("/visual-tests/lightbox");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-lightbox-page.png", {
        fullPage: true,
      });
    });

    test("link components", async ({ page }) => {
      await page.goto("/visual-tests/link");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-link-page.png", {
        fullPage: true,
      });
    });

    test("list components", async ({ page }) => {
      await page.goto("/visual-tests/list");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-list-page.png", {
        fullPage: true,
      });
    });

    test("markdown components", async ({ page }) => {
      await page.goto("/visual-tests/markdown");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-markdown-page.png", {
        fullPage: true,
      });
    });

    test("menu components", async ({ page }) => {
      await page.goto("/visual-tests/menu");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-menu-page.png", {
        fullPage: true,
      });
    });

    test("popover components", async ({ page }) => {
      await page.goto("/visual-tests/popover");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-popover-page.png", {
        fullPage: true,
      });
    });

    test("progress bar components", async ({ page }) => {
      await page.goto("/visual-tests/progress-bar");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-progress-bar-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("status components", () => {
    test("spinner components", async ({ page }) => {
      await page.goto("/visual-tests/spinner");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-spinner-page.png", {
        fullPage: true,
      });
    });
  });
});
