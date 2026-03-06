import { expect, test } from "@playwright/test";

test.describe("LightBox Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/lightbox");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-initial-page.png", {
      fullPage: true,
    });
  });

  test.describe("multi-image lightbox", () => {
    test("should open lightbox at first image", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("2-lightbox-open-first-image.png", {
        fullPage: true,
      });
    });

    test("should show navigation buttons on mouse move", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      await page.mouse.move(640, 360);
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot(
        "3-lightbox-nav-buttons-visible.png",
        {
          fullPage: true,
        },
      );
    });

    test("should navigate with keyboard", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(800);
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(800);
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(800);

      await expect(page).toHaveScreenshot(
        "4-lightbox-navigate-to-second-image-with-keyboard.png",
        {
          fullPage: true,
        },
      );
    });

    test("should navigate to image via thumbnail click", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      const thumbnailBar = page.getByTestId("ATL-Thumbnail-Bar").first();
      await thumbnailBar.getByAltText("Image 3").click();
      await page.waitForTimeout(800);

      await expect(page).toHaveScreenshot(
        "5-lightbox-navigate-to-third-image-via-thumbnail.png",
        { fullPage: true },
      );
    });

    test("should close lightbox with close button", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      await page.getByRole("button", { name: "Close" }).first().click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("6-lightbox-closed-via-button.png", {
        fullPage: true,
      });
    });

    test("should close lightbox with Escape key", async ({ page }) => {
      await page.getByRole("button", { name: "Open LightBox" }).click();
      await page.waitForTimeout(500);

      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("7-lightbox-closed-via-escape.png", {
        fullPage: true,
      });
    });
  });

  test.describe("lightbox opened at specific image", () => {
    test("should open lightbox starting at second image", async ({ page }) => {
      await page.getByRole("button", { name: "Open Second Image" }).click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(
        "8-lightbox-open-at-second-image.png",
        { fullPage: true },
      );
    });
  });

  test.describe("single image lightbox", () => {
    test("should open single image lightbox without navigation controls", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Open Single Image" }).click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("9-single-image-lightbox-open.png", {
        fullPage: true,
      });
    });

    test("should not show navigation buttons on mouse move", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Open Single Image" }).click();
      await page.waitForTimeout(500);

      await page.mouse.move(640, 360);
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot(
        "11-single-image-lightbox-nav-buttons-not-visible.png",
        {
          fullPage: true,
        },
      );
    });

    test("should not navigate with keyboard", async ({ page }) => {
      await page.getByRole("button", { name: "Open Single Image" }).click();
      await page.waitForTimeout(500);

      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(800);

      await expect(page).toHaveScreenshot(
        "12-single-image-lightbox-no-navigation.png",
        {
          fullPage: true,
        },
      );
    });

    test("should close single image lightbox with close button", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Open Single Image" }).click();
      await page.waitForTimeout(500);

      await page.getByRole("button", { name: "Close" }).first().click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(
        "13-single-image-lightbox-closed.png",
        { fullPage: true },
      );
    });
  });
});
