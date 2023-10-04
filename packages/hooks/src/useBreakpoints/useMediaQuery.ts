import { useEffect, useState } from "react";

/**
 * Internal use only.
 */
export function useMediaQuery(CSSMediaQuery: string) {
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
