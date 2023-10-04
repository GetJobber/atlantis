import { useMediaQuery } from "./useMediaQuery";

export const BREAKPOINT_SIZES = { sm: 490, md: 768, lg: 1080, xl: 1440 };

/**
 * Hook equivalent of CSS media queries with our
 * [supported breakpoints](https://atlantis.getjobber.com/?path=/docs/design-breakpoints--page).
 */
export function useBreakpoints() {
  const smallAndBelow = useMediaQuery(`(width < ${BREAKPOINT_SIZES.sm}px)`);
  const smallAndUp = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.sm}px)`);
  const mediumAndUp = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.md}px)`);
  const largeAndUp = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.lg}px)`);
  const extraLargeAndUp = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.xl}px)`);

  return {
    smallAndBelow,
    smallAndUp,
    mediumAndUp,
    largeAndUp,
    extraLargeAndUp,
    smallOnly: smallAndUp && !mediumAndUp,
    mediumOnly: mediumAndUp && !largeAndUp,
    largeOnly: largeAndUp && !extraLargeAndUp,
  };
}
