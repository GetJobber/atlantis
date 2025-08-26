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
  const isStorybookPath = urlParams.has("path");

  if (isStorybookPath) {
    window.location.href = `/storybook/${window.location.search}`;
  } else if (window.location.pathname === "/" && redirectToNewSite) {
    // NOTE: by default we redirect to storybook for now.
    // TODO: when the new site is ready, we just need to remove this case.
    window.location.href = `/storybook`;
  }
}
