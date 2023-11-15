import { useMediaQuery } from "./useMediaQuery";
import { BREAKPOINT_SIZES, Breakpoints } from "../DataList.const";

export function useResponsiveSizing(): Record<Breakpoints, boolean> {
  // This was originally written to look for "min-width: 0" which would always
  // return true no matter what.
  // So, instead of running media query on it, just set it to true.
  const xs = true;
  const sm = useMediaQuery(`(min-width: ${BREAKPOINT_SIZES.sm}px)`);
  const md = useMediaQuery(`(min-width: ${BREAKPOINT_SIZES.md}px)`);
  const lg = useMediaQuery(`(min-width: ${BREAKPOINT_SIZES.lg}px)`);
  const xl = useMediaQuery(`(min-width: ${BREAKPOINT_SIZES.xl}px)`);

  return { xs, sm, md, lg, xl };
}
