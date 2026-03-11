import { expect, test } from "@playwright/test";

test.describe("LightBox Composable Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/lightbox-composable");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-initial-page.png", {
      fullPage: true,
    });
  });

  test.describe("composable fullscreen", () => {
    test("should open and display the same as the monolithic lightbox", async ({
      page,
    }) => {
      await page
        .getByRole("button", { name: "Open Composable LightBox" })
        .click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("2-composable-fullscreen-open.png", {
        fullPage: true,
      });
    });

    test("should close composable fullscreen with close button", async ({
      page,
    }) => {
      await page
        .getByRole("button", { name: "Open Composable LightBox" })
        .click();
      await page.waitForTimeout(500);

      await page.getByRole("button", { name: "Close" }).first().click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(
        "3-composable-fullscreen-closed.png",
        { fullPage: true },
      );
    });
  });

  test.describe("inline gallery", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Show Inline Gallery" }).click();
      await page.waitForTimeout(300);
    });

    test("should render the inline gallery after showing it", async ({
      page,
    }) => {
      await expect(page).toHaveScreenshot("4-inline-gallery-initial.png", {
        fullPage: true,
      });
    });

    test("should show navigation buttons on mouse move", async ({ page }) => {
      const gallery = page.getByTestId("ATL-Gallery");
      await gallery.scrollIntoViewIfNeeded();
      await gallery.hover();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(
        "5-inline-gallery-nav-buttons-visible.png",
        { fullPage: true },
      );
    });

    test("should navigate to the next image", async ({ page }) => {
      const gallery = page.getByTestId("ATL-Gallery");
      await gallery.scrollIntoViewIfNeeded();
      await gallery.hover();
      await page.waitForTimeout(200);

      await page.getByLabel("Next image").last().click();
      await page.waitForTimeout(800);

      await expect(page).toHaveScreenshot("6-inline-gallery-second-image.png", {
        fullPage: true,
      });
    });

    test("should navigate to an image via thumbnail click", async ({
      page,
    }) => {
      const gallery = page.getByTestId("ATL-Gallery");
      await gallery.scrollIntoViewIfNeeded();

      const thumbnailBar = page.getByTestId("ATL-Thumbnail-Bar").last();
      await thumbnailBar.getByAltText("Image 3").click();
      await page.waitForTimeout(800);

      await expect(page).toHaveScreenshot(
        "7-inline-gallery-third-image-via-thumbnail.png",
        { fullPage: true },
      );
    });
  });
});
