/**
 * Determines if the current URL should redirect to Storybook.
 *
 * If `path` is present, we redirect to `/storybook/?path=___`.
 * If we're at `/` and the "nolikeynewsite" flag is set, we redirect to `/storybook`.
 */
export function getStorybookRedirectTarget({
  isLocalhost,
  pathname,
  pathParam,
  redirectToNewSite,
}: {
  isLocalhost: boolean;
  pathname: string;
  pathParam?: string;
  redirectToNewSite: boolean;
}): string | null {
  // When running locally, don't check for storybook redirects.
  if (isLocalhost) return null;

  if (pathParam) {
    const searchParams = new URLSearchParams();
    searchParams.set("path", pathParam);

    return `/storybook/?${searchParams.toString()}`;
  }

  if (pathname === "/" && redirectToNewSite) {
    // NOTE: by default we redirect to storybook for now.
    // TODO: when the new site is ready, we just need to remove this case.
    return `/storybook`;
  }

  return null;
}
