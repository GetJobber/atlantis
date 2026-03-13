import { expect, test } from "@playwright/test";
import {
  ListOfGeneratedMobileComponents,
  ListOfGeneratedWebComponents,
  //@ts-expect-error - No types for mjs file. that is okay.
} from "../baseComponentLists.mjs";
//@ts-expect-error - No types for mjs file. that is okay.
import { ListOfDesignPages } from "../baseDesignList.mjs";

const buildUniqueComponentList = () => {
  const combinedList = [
    ...ListOfGeneratedMobileComponents,
    ...ListOfGeneratedWebComponents,
  ].sort();

  const uniqueSet = new Set(combinedList);

  return Array.from(uniqueSet);
};

const uniqueList = buildUniqueComponentList();

uniqueList.forEach(component => {
  test(`Component Page For: ${component}`, async ({ page }) => {
    await page.goto(`/components/${component}`);
    await expect(
      page.getByRole("heading", { name: component, exact: true }),
    ).toHaveText(component);
    await expect(page.getByText("Component not found")).not.toBeVisible();
  });
});

ListOfDesignPages.forEach(
  ({ path, title }: { path: string; title: string }) => {
    test(`Design Page For: ${title}`, async ({ page }) => {
      await page.goto(`/design/${path}`);

      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toHaveText(title);

      await expect(page.getByText("Component not found")).not.toBeVisible();
    });
  },
);

test("Home Loads", async ({ page }) => {
  await page.goto("");

  await expect(page.locator("h1")).toHaveText("Home");
});

test("Design Loads", async ({ page }) => {
  await page.goto("/design");

  await expect(page.locator("h1")).toHaveText("Design");
});

test("All Components Load", async ({ page }) => {
  await page.goto("/components");

  await expect(page.locator("h1")).toHaveText("Components");
});
