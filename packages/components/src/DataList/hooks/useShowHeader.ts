import { useResponsiveSizing } from "./useResponsiveSizing";
import { useDataListContext } from "../context/DataListContext";

export function useShowHeader(): boolean {
  const { headerVisibility } = useDataListContext();
  if (headerVisibility === undefined) return true;

  const sizes = useResponsiveSizing();
  const sizeKeys = Object.keys(sizes) as (keyof typeof sizes)[];

  const showHeader = sizeKeys.reduce((previous, breakpoint) => {
    const isHeaderVisible = headerVisibility[breakpoint] || false;
    const isBreakpointTriggered = sizes[breakpoint];

    return previous || (isBreakpointTriggered && isHeaderVisible);
  }, false);

  return showHeader;
}
