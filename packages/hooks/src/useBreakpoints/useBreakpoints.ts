import { useMediaQuery } from "./useMediaQuery";

export const BREAKPOINT_SIZES = { sm: 490, md: 768, lg: 1080, xl: 1440 };

/**
 * Hook equivalent of CSS media queries with our
 * [supported breakpoints](https://atlantis.getjobber.com/design/breakpoints).
 */
export function useBreakpoints() {
  const { sm, md, lg, xl } = BREAKPOINT_SIZES;
  const extraSmallOnly = useMediaQuery(`(max-width: ${sm - 1}px)`);
  const smallAndUp = useMediaQuery(`(min-width: ${sm}px)`);
  const mediumAndUp = useMediaQuery(`(min-width: ${md}px)`);
  const largeAndUp = useMediaQuery(`(min-width: ${lg}px)`);
  const extraLargeAndUp = useMediaQuery(`(min-width: ${xl}px)`);

  return {
    smallAndUp,
    mediumAndUp,
    largeAndUp,
    extraLargeAndUp,
    extraSmallOnly,
    smallOnly: smallAndUp && !mediumAndUp,
    mediumOnly: mediumAndUp && !largeAndUp,
    largeOnly: largeAndUp && !extraLargeAndUp,
  };
}
