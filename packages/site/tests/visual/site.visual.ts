/* eslint-disable jest/no-commented-out-tests */
import { expect, test } from "@playwright/test";

test.describe("Atlantis Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
  });

  test.describe("layout components", () => {
    test("primary layouts", { tag: "@Layout" }, async ({ page }) => {
      await page.goto("/visual-tests/layout");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-layout-page.png", {
        fullPage: true,
      });
    });

    test("card components", { tag: "@Card" }, async ({ page }) => {
      await page.goto("/visual-tests/card");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-card-page.png", {
        fullPage: true,
      });
    });

    test("grid components", { tag: "@Grid" }, async ({ page }) => {
      await page.goto("/visual-tests/grid");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-grid-page.png", {
        fullPage: true,
      });
    });

    test("divider components", { tag: "@Divider" }, async ({ page }) => {
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

    test("modal components", { tag: "@Modal" }, async ({ page }) => {
      await page.goto("/visual-tests/modal");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-modal-page.png", {
        fullPage: true,
      });
    });

    test("drawer components", { tag: "@Drawer" }, async ({ page }) => {
      await page.goto("/visual-tests/drawer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-drawer-page.png", {
        fullPage: true,
      });
    });

    test("disclosure components", { tag: "@Disclosure" }, async ({ page }) => {
      await page.goto("/visual-tests/disclosure");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-disclosure-page.png", {
        fullPage: true,
      });
    });

    test("side drawer components", { tag: "@SideDrawer" }, async ({ page }) => {
      await page.goto("/visual-tests/side-drawer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-side-drawer-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("banner components", () => {
    test("banner components", { tag: "@Banner" }, async ({ page }) => {
      await page.goto("/visual-tests/banner");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-banner-page.png", {
        fullPage: true,
      });
    });

    test(
      "banner components (small window)",
      { tag: "@Banner" },
      async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 1000 });
        await page.goto("/visual-tests/banner");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-banner-small-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test(
      "banner components (medium window)",
      { tag: "@Banner" },
      async ({ page }) => {
        await page.setViewportSize({ width: 550, height: 1000 });
        await page.goto("/visual-tests/banner");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-banner-medium-page.png",
          {
            fullPage: true,
          },
        );
      },
    );
  });

  test.describe("form components", () => {
    test("form field components", { tag: "@FormField" }, async ({ page }) => {
      await page.goto("/visual-tests/form-field");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-form-field-page.png", {
        fullPage: true,
      });
    });

    test(
      "autocomplete components",
      { tag: "@Autocomplete" },
      async ({ page }) => {
        await page.goto("/visual-tests/autocomplete");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-autocomplete-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("combobox components", { tag: "@Combobox" }, async ({ page }) => {
      await page.goto("/visual-tests/combobox");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-combobox-page.png", {
        fullPage: true,
      });
    });

    test("datepicker components", { tag: "@Datepicker" }, async ({ page }) => {
      await page.goto("/visual-tests/datepicker");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-datepicker-page.png", {
        fullPage: true,
      });
    });

    test("radio group components", { tag: "@RadioGroup" }, async ({ page }) => {
      await page.goto("/visual-tests/radio-group");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-radio-group-page.png", {
        fullPage: true,
      });
    });

    test(
      "segmented control components",
      { tag: "@SegmentedControl" },
      async ({ page }) => {
        await page.goto("/visual-tests/segmented-control");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-segmented-control-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("select components", { tag: "@Select" }, async ({ page }) => {
      await page.goto("/visual-tests/select");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-select-page.png", {
        fullPage: true,
      });
    });

    test("select v2 components", { tag: "@SelectV2" }, async ({ page }) => {
      await page.goto("/visual-tests/select-v2");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-select-v2-page.png", {
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

    test("glimmer components", { tag: "@Glimmer" }, async ({ page }) => {
      await page.goto("/visual-tests/glimmer");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-glimmer-page.png", {
        fullPage: true,
      });
    });

    test("switch components", { tag: "@Switch" }, async ({ page }) => {
      await page.goto("/visual-tests/switch");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-switch-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("data display components", () => {
    test("datalist components", { tag: "@DataList" }, async ({ page }) => {
      await page.goto("/visual-tests/datalist");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-datalist-page.png", {
        fullPage: true,
      });
    });

    test(
      "description list components",
      { tag: "@DescriptionList" },
      async ({ page }) => {
        await page.goto("/visual-tests/description-list");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-description-list-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("gallery components", { tag: "@Gallery" }, async ({ page }) => {
      await page.goto("/visual-tests/gallery");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-gallery-page.png", {
        fullPage: true,
      });
    });

    test("table components", { tag: "@Table" }, async ({ page }) => {
      await page.goto("/visual-tests/table");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-table-page.png", {
        fullPage: true,
      });
    });

    test("data table components", { tag: "@DataTable" }, async ({ page }) => {
      await page.goto("/visual-tests/data-table");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-data-table-page.png", {
        fullPage: true,
      });
    });

    test(
      "data table atoms components",
      { tag: "@DataTableAtoms" },
      async ({ page }) => {
        await page.goto("/visual-tests/data-table-atoms");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-data-table-atoms-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("tabs components", { tag: "@Tabs" }, async ({ page }) => {
      await page.goto("/visual-tests/tabs");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-tabs-page.png", {
        fullPage: true,
      });
    });

    test("toast components", { tag: "@Toast" }, async ({ page }) => {
      await page.goto("/visual-tests/toast");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-toast-page.png", {
        fullPage: true,
      });
    });

    test("tooltip components", { tag: "@Tooltip" }, async ({ page }) => {
      await page.goto("/visual-tests/tooltip");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-tooltip-page.png", {
        fullPage: true,
      });
    });

    /*

    We have a font rendering issue between local and CI with JobberPro.
    Instead of slowing down this PR, we're commenting out for now.
    test("typography components", { tag: "@Typography" }, async ({ page }) => {
      await page.goto("/visual-tests/typography");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-typography-page.png", {
        fullPage: true,
      });
    });
 */
  });

  test.describe("selection components", () => {
    test("chip components", { tag: "@Chip" }, async ({ page }) => {
      await page.goto("/visual-tests/chip");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-chip-page.png", {
        fullPage: true,
      });
    });

    test("chips components", { tag: "@Chips" }, async ({ page }) => {
      await page.goto("/visual-tests/chips");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-chips-page.png", {
        fullPage: true,
      });
    });

    test(
      "feature switch components",
      { tag: "@FeatureSwitch" },
      async ({ page }) => {
        await page.goto("/visual-tests/feature-switch");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-feature-switch-page.png",
          {
            fullPage: true,
          },
        );
      },
    );
  });

  test.describe("input components", () => {
    test(
      "inline label components",
      { tag: "@InlineLabel" },
      async ({ page }) => {
        await page.goto("/visual-tests/inline-label");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-inline-label-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("input date components", { tag: "@InputDate" }, async ({ page }) => {
      await page.goto("/visual-tests/input-date");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-date-page.png", {
        fullPage: true,
      });
    });

    test("input email components", { tag: "@InputEmail" }, async ({ page }) => {
      await page.goto("/visual-tests/input-email");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-email-page.png", {
        fullPage: true,
      });
    });

    test("input file components", { tag: "@InputFile" }, async ({ page }) => {
      await page.goto("/visual-tests/input-file");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-file-page.png", {
        fullPage: true,
      });
    });

    test("input group components", { tag: "@InputGroup" }, async ({ page }) => {
      await page.goto("/visual-tests/input-group");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-group-page.png", {
        fullPage: true,
      });
    });

    test(
      "input number components",
      { tag: "@InputNumber" },
      async ({ page }) => {
        await page.goto("/visual-tests/input-number");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-input-number-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test(
      "input password components",
      { tag: "@InputPassword" },
      async ({ page }) => {
        await page.goto("/visual-tests/input-password");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-input-password-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test(
      "input phone number components",
      { tag: "@InputPhoneNumber" },
      async ({ page }) => {
        await page.goto("/visual-tests/input-phone-number");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-input-phone-number-page.png",
          {
            fullPage: true,
          },
        );
      },
    );

    test("input text components", { tag: "@InputText" }, async ({ page }) => {
      await page.goto("/visual-tests/input-text");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-text-page.png", {
        fullPage: true,
      });
    });

    test("input time components", { tag: "@InputTime" }, async ({ page }) => {
      await page.goto("/visual-tests/input-time");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-input-time-page.png", {
        fullPage: true,
      });
    });

    test(
      "input validation components",
      { tag: "@InputValidation" },
      async ({ page }) => {
        await page.goto("/visual-tests/input-validation");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-input-validation-page.png",
          {
            fullPage: true,
          },
        );
      },
    );
  });

  test.describe("utility components", () => {
    test("lightbox components", { tag: "@Lightbox" }, async ({ page }) => {
      await page.goto("/visual-tests/lightbox");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-lightbox-page.png", {
        fullPage: true,
      });
    });

    test("link components", { tag: "@Link" }, async ({ page }) => {
      await page.goto("/visual-tests/link");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-link-page.png", {
        fullPage: true,
      });
    });

    test("list components", { tag: "@List" }, async ({ page }) => {
      await page.goto("/visual-tests/list");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-list-page.png", {
        fullPage: true,
      });
    });

    test("markdown components", { tag: "@Markdown" }, async ({ page }) => {
      await page.goto("/visual-tests/markdown");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-markdown-page.png", {
        fullPage: true,
      });
    });

    test("menu components", { tag: "@Menu" }, async ({ page }) => {
      await page.goto("/visual-tests/menu");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-menu-page.png", {
        fullPage: true,
      });
    });

    test("popover components", { tag: "@Popover" }, async ({ page }) => {
      await page.goto("/visual-tests/popover");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-popover-page.png", {
        fullPage: true,
      });
    });

    test(
      "progress bar components",
      { tag: "@ProgressBar" },
      async ({ page }) => {
        await page.goto("/visual-tests/progress-bar");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(
          "visual-test-progress-bar-page.png",
          {
            fullPage: true,
          },
        );
      },
    );
  });

  test.describe("status components", () => {
    test("spinner components", { tag: "@Spinner" }, async ({ page }) => {
      await page.goto("/visual-tests/spinner");
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("visual-test-spinner-page.png", {
        fullPage: true,
      });
    });
  });
});
