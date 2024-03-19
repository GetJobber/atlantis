import { useEffect, useState } from "react";

export function useMediaQuery(CSSMediaQuery: string) {
  /**
   * matchMedia have had full support for browsers since 2012 but jest, being a
   * lite version of a DOM, doesn't support it.
   *
   * Instead of the consumers mocking matchMedia on every usage of DataList,
   * we can just return true to mimic the largest screen we support.
   *
   * In the event that the consumer wants to test the DataList on different
   * screen sizes, they can use the `mockViewportWidth` function from
   * `@jobber/components/useBreakpoints`.
   */
  if (window.matchMedia === undefined) return true;

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
