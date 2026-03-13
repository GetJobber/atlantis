import { Page, expect, test } from "@playwright/test";
import {
  ListOfGeneratedMobileComponents,
  ListOfGeneratedWebComponents,
  //@ts-expect-error - No types for mjs file. that is okay.
} from "../baseComponentLists.mjs";

/**
 *
 * This was originally vibe coded, but I have reviewed it.
 *
 * It works, but it's overly complicated, internally facing and not extensible.
 *
 * I would rather us create a POM to allow for generic page access, and then build a
 * declarative test suite on top of it that is easier to read and maintain.
 *
 * This is a very imperative style test suite that is tough to grok.
 *
 * If we ever move this into CI, reconsider this test suite.
 *
 * Because it's not part of any of our default execuation paths right now, I'm inclined to leave it as overly complicated for now.
 *
 * Ideally we revisit "link checking" as a topic holistically at some point and come up with a clean solution.
 */

const LOCAL_ORIGIN = "http://localhost:5173";
const COMPONENT_NOT_FOUND_TEXT = "Component not found";
const PAGE_NOT_FOUND_HEADING = /404 - Lost at Sea/;
const STORYBOOK_NO_PREVIEW_TEXT =
  "Sorry, but you either have no stories or none are selected somehow.";
const STORYBOOK_MISSING_STORY_TEXT = /Couldn't find story matching/;

interface DiscoveredLink {
  readonly label: string;
  readonly rawHref: string;
  readonly resolvedHref: string;
  readonly sourceUrl: string;
  readonly sourceTabLabel?: string;
}

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
 * Manual-only component link sweep.
 *
 * This intentionally follows real Atlantis and Storybook links and is kept out
 * of the default Playwright matchers because it is slower than the standard
 * component smoke coverage.
 */
uniqueList.forEach(component => {
  test(`Component Link Check For: ${component}`, async ({ page }) => {
    const componentUrl = `/components/${component}`;

    await visitComponentPage(page, componentUrl, component);

    const links = await collectLinksAcrossTabs(page);
    const linkPage = await page.context().newPage();

    try {
      for (const link of links) {
        await test.step(`Validates link: ${
          link.label || link.rawHref
        }`, async () => {
          await validateLink(page, linkPage, link);
        });
      }
    } finally {
      await linkPage.close();
    }
  });
});

async function visitComponentPage(
  page: Page,
  componentUrl: string,
  component: string,
) {
  await page.goto(componentUrl);

  await expect(
    page.getByRole("heading", { name: component, exact: true }),
  ).toHaveText(component);
  await expect(page.getByText(COMPONENT_NOT_FOUND_TEXT)).not.toBeVisible();
}

async function collectLinksAcrossTabs(page: Page) {
  const links = new Map<string, DiscoveredLink>();
  const tabs = getPrimaryTablist(page).locator("[role='tab']");
  const tabLabels = await tabs.evaluateAll(tabNodes =>
    tabNodes.map(tab => tab.textContent?.trim() ?? ""),
  );

  if (tabLabels.length === 0) {
    return collectLinksFromVisibleContent(page);
  }

  for (const tabLabel of tabLabels) {
    const tabLinks = await collectLinksForTab(page, tabLabel);

    for (const link of tabLinks) {
      links.set(link.resolvedHref, link);
    }
  }

  return Array.from(links.values());
}

async function collectLinksForTab(page: Page, sourceTabLabel: string) {
  await activateTab(sourceTabLabel, page);

  return collectLinksFromVisibleContent(page, sourceTabLabel);
}

async function collectLinksFromVisibleContent(
  page: Page,
  sourceTabLabel?: string,
): Promise<DiscoveredLink[]> {
  const currentUrl = page.url();
  const rawLinks = await page.locator("main a[href]").evaluateAll(anchors =>
    anchors
      .filter(anchor => {
        const element = anchor as HTMLElement;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map(anchor => ({
        href: anchor.getAttribute("href") ?? "",
        label: anchor.textContent?.trim() ?? "",
      })),
  );

  const seen = new Set<string>();
  const links: DiscoveredLink[] = [];

  for (const rawLink of rawLinks) {
    const href = rawLink.href.trim();

    if (href === "") continue;

    const resolvedHref = new URL(href, currentUrl).toString();

    if (shouldSkipLink(href, resolvedHref) || seen.has(resolvedHref)) continue;

    seen.add(resolvedHref);
    links.push({
      label: rawLink.label,
      rawHref: href,
      resolvedHref,
      sourceUrl: currentUrl,
      sourceTabLabel,
    });
  }

  return links;
}

async function validateLink(
  sourcePage: Page,
  destinationPage: Page,
  link: DiscoveredLink,
) {
  if (isSamePageHashLink(link)) {
    await validateSamePageHashLink(sourcePage, link);

    return;
  }

  const destination = new URL(link.resolvedHref);

  if (isStorybookLink(destination)) {
    await validateStorybookLink(destinationPage, link);
  } else {
    await validateAtlantisLink(destinationPage, link);
  }
}

async function validateStorybookLink(page: Page, link: DiscoveredLink) {
  const destination = new URL(link.resolvedHref);
  const response = await page.goto(link.resolvedHref);

  expect(
    response?.ok(),
    `Expected Storybook link to load: ${link.resolvedHref}`,
  ).toBeTruthy();

  await expect(page.getByText(STORYBOOK_NO_PREVIEW_TEXT)).not.toBeVisible();
  await expect(page.getByText(STORYBOOK_MISSING_STORY_TEXT)).not.toBeVisible();
  await expect(page.locator("#storybook-preview-iframe")).toBeVisible();

  if (destination.hash) {
    await expectHashTargetToExist(page, destination);
  }
}

async function validateAtlantisLink(page: Page, link: DiscoveredLink) {
  const destination = new URL(link.resolvedHref);
  const response = await page.goto(link.resolvedHref);

  expect(
    response?.ok(),
    `Expected Atlantis link to load: ${link.resolvedHref}`,
  ).toBeTruthy();

  await expect(page.getByText(COMPONENT_NOT_FOUND_TEXT)).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: PAGE_NOT_FOUND_HEADING }),
  ).not.toBeVisible();
  await expect(page.locator("main")).toBeVisible();

  if (destination.hash) {
    await expectHashTargetToExist(page, destination);
  }
}

async function validateSamePageHashLink(page: Page, link: DiscoveredLink) {
  if (link.sourceTabLabel) {
    await activateTab(link.sourceTabLabel, page);
  }

  const anchor = page
    .locator(`main a[href="${escapeAttributeValue(link.rawHref)}"]`)
    .first();

  await expect(
    anchor,
    `Expected same-page link to remain visible: ${link.rawHref}`,
  ).toBeVisible();

  const destination = new URL(link.resolvedHref);

  await expectHashTargetToExist(page, destination);
  await anchor.click();
  await expect
    .poll(() => new URL(page.url()).hash, {
      message: `Expected same-page link to update the URL hash: ${link.resolvedHref}`,
    })
    .toBe(destination.hash);
}

async function activateTab(tabLabel: string, page: Page) {
  const tab = getPrimaryTablist(page).getByRole("tab", {
    name: tabLabel,
    exact: true,
  });

  await expect(tab).toBeVisible();
  await tab.click({ force: true });
  await expect(
    page.locator("main [role='tabpanel']:visible").first(),
  ).toBeVisible();
}

function getPrimaryTablist(page: Page) {
  return page.locator("main [role='tablist']:visible").first();
}

async function expectHashTargetToExist(page: Page, destination: URL) {
  const hashId = decodeURIComponent(destination.hash.slice(1));
  const hashTarget = page.locator(`[id="${escapeAttributeValue(hashId)}"]`);

  await expect
    .poll(async () => hashTarget.count(), {
      message: `Expected hash target to exist: ${destination.toString()}`,
    })
    .toBeGreaterThan(0);
}

function isStorybookLink(url: URL) {
  return /^\/storybook\/(web|mobile)\/?$/.test(url.pathname);
}

function isSamePageHashLink(link: DiscoveredLink) {
  const source = new URL(link.sourceUrl);
  const destination = new URL(link.resolvedHref);

  return (
    destination.origin === source.origin &&
    destination.pathname === source.pathname &&
    destination.hash !== ""
  );
}

function shouldSkipLink(rawHref: string, resolvedHref: string) {
  if (
    rawHref === "#" ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:")
  ) {
    return true;
  }

  const destination = new URL(resolvedHref);

  if (destination.origin === LOCAL_ORIGIN) {
    return false;
  }

  return !isStorybookLink(destination);
}

function escapeAttributeValue(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}
