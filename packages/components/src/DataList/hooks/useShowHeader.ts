import { useResponsiveSizing } from "./useResponsiveSizing";
import { useDataListContext } from "../context/DataListContext";

export function useShowHeader(): boolean {
  const { headerVisibility } = useDataListContext();
  const sizes = useResponsiveSizing();

  if (headerVisibility === undefined) return true;

  const sizeKeys = Object.keys(sizes) as (keyof typeof sizes)[];

  const showHeader = sizeKeys.reduce((previous, breakpoint) => {
    const isHeaderVisible = headerVisibility[breakpoint] || false;
    const isBreakpointTriggered = sizes[breakpoint];

    return previous || (isBreakpointTriggered && isHeaderVisible);
  }, false);

  return showHeader;
}
