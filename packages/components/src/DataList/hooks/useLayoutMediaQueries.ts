import { useEffect, useState } from "react";
import { BREAKPOINTS, BREAKPOINT_SIZES, Breakpoints } from "../DataList.const";

export function useLayoutMediaQueries() {
  const mediaQueries = BREAKPOINTS.reduce(
    (previous, breakpoint) => ({
      ...previous,
      [breakpoint]: window.matchMedia(breakpointToMediaQuery(breakpoint)),
    }),
    {} as Record<Breakpoints, MediaQueryList>,
  );

  const initialMatches = BREAKPOINTS.reduce(
    (previous, breakpoint) => ({
      ...previous,
      [breakpoint]: mediaQueries[breakpoint].matches,
    }),
    {} as Record<Breakpoints, boolean>,
  );

  const [matches, setMatches] = useState(initialMatches);

  const handlers = BREAKPOINTS.reduce((previous, breakpoint) => {
    const handler = (e: MediaQueryListEvent) =>
      setMatches(previousMatches => ({
        ...previousMatches,
        [breakpoint]: e.matches,
      }));
    return { ...previous, [breakpoint]: handler };
  }, {} as Record<Breakpoints, (e: MediaQueryListEvent) => void>);

  // Set up mediaQuery event handlers
  useEffect(() => {
    BREAKPOINTS.forEach(breakpoint => {
      mediaQueries[breakpoint].addEventListener("change", handlers[breakpoint]);
    });

    return () => {
      BREAKPOINTS.forEach(breakpoint => {
        mediaQueries[breakpoint].removeEventListener(
          "change",
          handlers[breakpoint],
        );
      });
    };
  }, [mediaQueries]);

  return matches;
}

function breakpointToMediaQuery(breakpoint: Breakpoints) {
  return `(min-width: ${BREAKPOINT_SIZES[breakpoint]}px)`;
}
