import { useResponsiveSizing } from "./useResponsiveSizing";
import { useDataListContext } from "../context/DataListContext";

export function useActiveLayout() {
  const { layoutBreakpoints, layouts } = useDataListContext();
  const breakpoints = useResponsiveSizing();
  const reversedLayoutBreakpoints = [...layoutBreakpoints].reverse();

  const activeBreakpoint =
    reversedLayoutBreakpoints.find(key => breakpoints[key]) ||
    layoutBreakpoints[0];

  const layout = layouts[activeBreakpoint];
  return { layout, activeBreakpoint };
}
