/**
 * This checks if the page is attempting to load a storybook path.
 *
 * If the url contains `?path`, we redirect to `/storybook/?path=___`.
 *
 * If the url is the root page, we redirect to `/storybook` unless the `?new`
 * param is set, which forces the new docs site to render.
 *
 * Any other path is assumed to be owned by the new docs site, and will render.
 */
export function handleStorybookRedirect() {
  // When running locally, don't check for storybook redirects.
  if (window.location.host.includes("localhost")) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const forceNewDocsSite = urlParams.has("new");
  const isStorybookPath = urlParams.has("path");

  if (isStorybookPath) {
    window.location.href = `/storybook/${window.location.search}`;
  } else if (window.location.pathname === "/" && !forceNewDocsSite) {
    // NOTE: by default we redirect to storybook for now.
    // TODO: when the new site is ready, we just need to remove this case.
    window.location.href = `/storybook`;
  }
}
