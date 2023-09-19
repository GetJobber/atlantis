import { useMediaQuery } from "./useMediaQuery";
import { BREAKPOINT_SIZES, Breakpoints } from "../DataList.const";

export function useResponsiveSizing(): Record<Breakpoints, boolean> {
  const xs = useMediaQuery(`(width > ${BREAKPOINT_SIZES.xs}px)`);
  const sm = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.sm}px)`);
  const md = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.md}px)`);
  const lg = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.lg}px)`);
  const xl = useMediaQuery(`(width >= ${BREAKPOINT_SIZES.xl}px)`);

  return { xs, sm, md, lg, xl };
}
