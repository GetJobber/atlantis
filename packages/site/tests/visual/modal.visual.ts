import { expect, test } from "@playwright/test";

test.describe("Modal Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/visual-tests/modal");
    await page.waitForTimeout(1000);
  });

  test("should capture initial page state", async ({ page }) => {
    await expect(page).toHaveScreenshot("1-initial-page.png", {
      fullPage: true,
    });
  });

  test.describe("basic modals", () => {
    test("should test basic modal", async ({ page }) => {
      const basicModalButton = page.getByRole("button", {
        name: "Open Basic Modal",
      });
      await basicModalButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("2-basic-modal-open.png", {
        fullPage: true,
      });

      const closeButton = page.getByRole("button", { name: "Close" });
      await closeButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("3-basic-modal-closed.png", {
        fullPage: true,
      });
    });

    test("should test confirmation modal", async ({ page }) => {
      const confirmationModalButton = page.getByRole("button", {
        name: "Open Confirmation Modal",
      });
      await confirmationModalButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("4-confirmation-modal-open.png", {
        fullPage: true,
      });

      const confirmButton = page.getByRole("button", {
        name: "Confirm",
        exact: true,
      });
      await confirmButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("5-confirmation-modal-closed.png", {
        fullPage: true,
      });
    });

    test("should test custom modal if available", async ({ page }) => {
      const customModalButton = page.getByRole("button", {
        name: "Open Custom Modal",
      });

      if (await customModalButton.isVisible()) {
        await customModalButton.click();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot("6-custom-modal-open.png", {
          fullPage: true,
        });

        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot("7-custom-modal-closed.png", {
          fullPage: true,
        });
      }
    });
  });

  test.describe("sized modals", () => {
    test("should test large modal", async ({ page }) => {
      const largeModalButton = page.getByRole("button", {
        name: "Open Large Modal",
      });
      await largeModalButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("8-large-modal-open.png", {
        fullPage: true,
      });

      const cancelButton = page.getByRole("button", {
        name: "Cancel",
        exact: true,
      });
      await cancelButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("9-large-modal-closed.png", {
        fullPage: true,
      });
    });
  });

  test.describe("form modal", () => {
    test("should test form modal - opening and filling", async ({ page }) => {
      const formModalButton = page.getByRole("button", {
        name: "Open Form Modal",
      });
      await formModalButton.click();
      await page.waitForTimeout(500);

      // Fill in some form fields
      await page.getByText("Enter your name").fill("Test User");
      await page.getByText("Enter your email").fill("test@example.com");
      await page.getByText("Enter your message").fill("This is a test message");

      await expect(page).toHaveScreenshot("12-form-modal-filled.png", {
        fullPage: true,
      });
    });

    test("should test form modal - submission", async ({ page }) => {
      const formModalButton = page.getByRole("button", {
        name: "Open Form Modal",
      });
      await formModalButton.click();
      await page.waitForTimeout(500);

      // Fill in form fields quickly for submission test
      await page.getByText("Enter your name").fill("Test User");
      await page.getByText("Enter your email").fill("test@example.com");

      const submitButton = page.getByRole("button", {
        name: "Submit",
        exact: true,
      });
      await submitButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("13-form-modal-closed.png", {
        fullPage: true,
      });
    });
  });

  test.describe("tabbed modal", () => {
    test("should test modal with tabs - general tab", async ({ page }) => {
      const tabModalButton = page.getByRole("button", {
        name: "Open Modal with Tabs",
      });
      await tabModalButton.click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("14-tab-modal-general.png", {
        fullPage: true,
      });
    });

    test("should test modal with tabs - advanced tab", async ({ page }) => {
      const tabModalButton = page.getByRole("button", {
        name: "Open Modal with Tabs",
      });
      await tabModalButton.click();
      await page.waitForTimeout(500);

      await page.getByRole("tab", { name: "Advanced" }).click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("15-tab-modal-advanced.png", {
        fullPage: true,
      });
    });

    test("should test modal with tabs - notifications tab", async ({
      page,
    }) => {
      const tabModalButton = page.getByRole("button", {
        name: "Open Modal with Tabs",
      });
      await tabModalButton.click();
      await page.waitForTimeout(500);

      await page.getByRole("tab", { name: "Notifications" }).click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("16-tab-modal-notifications.png", {
        fullPage: true,
      });
    });

    test("should test modal with tabs - closing", async ({ page }) => {
      const tabModalButton = page.getByRole("button", {
        name: "Open Modal with Tabs",
      });
      await tabModalButton.click();
      await page.waitForTimeout(500);

      const saveButton = page.getByRole("button", {
        name: "Save",
        exact: true,
      });
      await saveButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("17-tab-modal-closed.png", {
        fullPage: true,
      });
    });
  });
});
