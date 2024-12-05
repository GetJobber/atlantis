/**
 * This checks if the page is attempting to load a storybook path.
 *
 * If the url contains `?path`, we redirect to `/storybook/?path=___`.
 *
 * If not, by default we still redirect to `/storybook` unless the url contains
 * `?new` which forces the new docs site to render.
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
  } else if (!forceNewDocsSite) {
    // NOTE: by default we redirect to storybook for now.
    // TODO: when the new site is ready, we just need to remove this case.
    window.location.href = `/storybook`;
  }
}
