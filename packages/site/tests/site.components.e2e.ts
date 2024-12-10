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
  // eslint-disable-next-line max-statements
  test(`Component Page For: ${component}`, async ({ page }) => {
    await page.goto(`http://localhost:5173/components/${component}`);
    await expect(
      page.getByRole("heading", { name: component, exact: true }),
    ).toHaveText(component);
    await expect(page.getByText("Component not found")).not.toBeVisible();
    const links = await page.locator("[data-storybook-link]");

    for (const link of await links.all()) {
      const actualLInk = link.locator("a");
      const href = await actualLInk.getAttribute("href");

      if (href) {
        await page.goto(href);
        await page.waitForURL(href);
        await page.waitForTimeout(1000);
        const heading = await page.getByRole("heading", {
          name: component,
          exact: true,
        });

        if (await heading.isVisible()) {
          await expect(heading).toBeVisible();
        } else {
          const alternativeElement = page.getByRole("button", {
            name: "Canvas",
          });
          await expect(alternativeElement).toBeVisible();
        }
        await page.goBack();
      }
    }
  });
});
/*
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
*/
