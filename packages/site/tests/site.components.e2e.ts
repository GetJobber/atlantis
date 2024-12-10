import { expect, test } from "@playwright/test";
import {
  ListOfGeneratedMobileComponents,
  ListOfGeneratedWebComponents,
  //@ts-expect-error - No types for mjs file. that is okay.
} from "../baseComponentLists.mjs";

const combinedList = [
  ...ListOfGeneratedMobileComponents,
  ...ListOfGeneratedWebComponents,
].sort();

const uniqueSet = new Set(combinedList);

const uniqueList = Array.from(uniqueSet);
uniqueList.forEach(component => {
  test(`Component Page For: ${component} Loads`, async ({ page }) => {
    await page.goto(`http://localhost:5173/components/${component}`);
    await expect(
      page.getByRole("heading", { name: component, exact: true }),
    ).toHaveText(component);
    await expect(page.getByText("Component not found")).not.toBeVisible();
  });
});

test("Home Loads", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.locator("h1")).toHaveText("Atlantis");
});

test("Design Loads", async ({ page }) => {
  await page.goto("http://localhost:5173/design");

  await expect(page.locator("h1")).toHaveText("Design");
});

test("All Components Load", async ({ page }) => {
  await page.goto("http://localhost:5173/components");

  await expect(page.locator("h1")).toHaveText("Components");
});
