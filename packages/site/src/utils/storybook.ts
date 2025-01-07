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
  const isStorybookPath = urlParams.has("path");

  if (isStorybookPath) {
    window.location.href = `/storybook/${window.location.search}`;
  }
}
