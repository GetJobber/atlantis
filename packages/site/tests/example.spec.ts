import { expect, test } from "@playwright/test";

test("Home Loads", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.locator("h1")).toHaveText("Atlantis");
});

test("Components Loads", async ({ page }) => {
  await page.goto("http://localhost:5173/components");

  const elements = await page.getByRole("button").all();

  // Step 3: Click each element and check if the new page renders correctly
  console.warn("HI???", elements.length);

  for (const element of elements) {
    // Click the element
    await element.click();

    await page.waitForURL("http://localhost:5173/components/*");
    console.warn("elelment", element);
    await expect(page.getByText("Component not found")).not.toBeVisible();

    await page.goBack();
  }
  await expect(page.locator("h1")).toHaveText("Components");
});

test("Design Loads", async ({ page }) => {
  await page.goto("http://localhost:5173/design");

  await expect(page.locator("h1")).toHaveText("Design");
});

test("All Components Load", async ({ page }) => {
  await page.goto("http://localhost:5173/components");

  await expect(page.locator("h1")).toHaveText("Components");
});
