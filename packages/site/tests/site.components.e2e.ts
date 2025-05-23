import { Locator, Page, expect, test } from "@playwright/test";
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

/**
 * There is 100% a more efficient way to do this, and we should explore
 * that, but for now, this is a good way to ensure that all components
 * are loading correctly in a relatively blunt way.
 *
 * Currently this test will (for each component in the uniqueList):
 *
 * 1. Visit the component page
 * 2. Check that the heading is loading, which means the component was found and is rendered.
 * 3. Double check that we didn't hit the 404 page by explicitly checking for that error text.
 * 4. Find all the links on the page that match the shape we want to check.
 * 5. Visit each link and check that the heading is loading, which means it's a document page.
 * 6. If the heading doesn't load, it means we've linked to an example page which means a "Canvas" button should be visible.
 * 7. Go back to the original component page, so we can properly click on the next link (if there is one).
 */
uniqueList.forEach(component => {
  test(`Component Page For: ${component}`, async ({ page }) => {
    await page.goto(`/components/${component}`);
    await expect(
      page.getByRole("heading", { name: component, exact: true }),
    ).toHaveText(component);
    await expect(page.getByText("Component not found")).not.toBeVisible();
    const links = await page.locator("[data-storybook-link]");

    for (const link of await links.all()) {
      const actualLInk = link.locator("a");
      const href = await actualLInk.getAttribute("href");

      if (href) {
        const heading = await goToLinkAndGetHeading(page, href, component);

        await checkThatHeadingExists(heading, page);
        await page.goBack();
      }
    }
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

const goToLinkAndGetHeading = async (
  page: Page,
  href: string,
  component: string,
) => {
  await page.goto(href);
  await page.waitForURL(href);

  return page.getByRole("heading", {
    name: component,
    exact: true,
  });
};

async function checkThatHeadingExists(heading: Locator, page) {
  if (await heading.isVisible()) {
    await expect(heading).toBeVisible();
  } else {
    const alternativeElement = page.getByRole("button", {
      name: "Canvas",
      exact: true,
    });
    await expect(alternativeElement).toBeVisible();
  }
}

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
