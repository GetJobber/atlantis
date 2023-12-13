import { useEffect, useState } from "react";

/**
 * Sets the JS media query listener. Internal use only.
 */
function useUnSafeMediaQuery(CSSMediaQuery: string) {
  const [matches, setMatches] = useState(
    window.matchMedia(CSSMediaQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(CSSMediaQuery);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [CSSMediaQuery]);

  return matches;
}

const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

// safe to disable eslint here because we want a function that does nothing
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const useMediaQuery = canUseDom ? useUnSafeMediaQuery : () => true;
