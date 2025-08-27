// NOTE: keep this map in sync as you migrate stories to Storybook v9.
const migratedStories = [
  "components-actions-button-web",
  "components-actions-button-mobile",
];

/**
 * This checks if the page is attempting to load a storybook path.
 *
 * If the url contains `?path`, we redirect to `/storybook/?path=___`.
 *
 * Any other path is assumed to be owned by the new docs site, and will render.
 */
export function handleStorybookRedirect() {
  // When running locally, don't check for storybook redirects.
  if (window.location.host.includes("localhost")) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const redirectToNewSite = localStorage.getItem("nolikeynewsite");
  const storybookPath = urlParams.get("path");

  if (storybookPath) {
    window.location.href = getRedirectPath(storybookPath);
  } else if (window.location.pathname === "/" && redirectToNewSite) {
    // NOTE: by default we redirect to storybook for now.
    // TODO: when the new site is ready, we just need to remove this case.
    window.location.href = `/storybook`;
  }
}

function isMigratedStory(path: string) {
  return migratedStories.some(story => path.includes(story));
}

function getRedirectPath(storybookPath: string) {
  let newSearch = window.location.search;
  let prefix = "/storybook";

  if (isMigratedStory(storybookPath)) {
    if (storybookPath.includes("-web")) {
      newSearch = newSearch.replace("-web", "");
      prefix = "/storybook/web";
    } else if (storybookPath.includes("-mobile")) {
      newSearch = newSearch.replace("-mobile", "");
      prefix = "/storybook/mobile";
    }
  }

  return `${prefix}/${newSearch}`;
}
