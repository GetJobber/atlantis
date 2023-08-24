import React from "react";
import { BREAKPOINTS, Breakpoints } from "../../DataList.const";
import { DataListObject } from "../../DataList.types";
import { sortSizeProp } from "../../DataList.utils";
import { DataListLayoutProps } from "../DataListLayout/DataListLayout";

interface DataListLayoutInternalProps<T extends DataListObject> {
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  renderLayout: (
    layout: React.ReactElement<DataListLayoutProps<T>>,
  ) => JSX.Element;
  mediaMatches?: Record<Breakpoints, boolean>;
}

export function DataListLayoutInternal<T extends DataListObject>({
  layouts,
  renderLayout,
  mediaMatches,
}: DataListLayoutInternalProps<T>) {
  const sizePropsOfLayouts = layouts?.map(layout => layout.props.size || "xs");
  const layoutToRender = layouts?.find(layout => {
    const layoutSize = layout.props.size || "xs";
    const isVisible = isLayoutVisible({
      layoutSize,
      mediaMatches,
      sizePropsOfLayouts,
    });
    return isVisible;
  });
  return (layoutToRender && renderLayout(layoutToRender)) || <></>;
}

interface IsLayoutVisibleParams {
  layoutSize: Breakpoints;
  mediaMatches?: Record<Breakpoints, boolean>;
  sizePropsOfLayouts?: Breakpoints[];
}

/**
 * Determine is layout is visible by checking a media query matches for the
 * visible sizes of the layout and there isn't a larger layout that should be rendered
 */
function isLayoutVisible({
  layoutSize,
  mediaMatches,
  sizePropsOfLayouts,
}: IsLayoutVisibleParams) {
  const largerBreakpointsToHide = sizePropsOfLayouts?.filter(
    size => BREAKPOINTS.indexOf(size) > BREAKPOINTS.indexOf(layoutSize),
  );
  const sortedLargerBreakpoints = sortSizeProp(largerBreakpointsToHide || []);

  const visibleBreakpoints = BREAKPOINTS.slice(
    BREAKPOINTS.indexOf(layoutSize),
    sortedLargerBreakpoints[0]
      ? BREAKPOINTS.indexOf(sortedLargerBreakpoints[0])
      : undefined,
  );

  const isVisibleBreakpoint = visibleBreakpoints.some(breakpoint => {
    return Boolean(mediaMatches?.[breakpoint]);
  });

  const largerLayoutIsNotVisible = largerBreakpointsToHide?.reduce<boolean>(
    (acc, breakpoint) => {
      return acc && !mediaMatches?.[breakpoint];
    },
    true,
  );

  return isVisibleBreakpoint && largerLayoutIsNotVisible;
}
