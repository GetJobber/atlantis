import React, {
  Children,
  ReactElement,
  ReactNode,
  isValidElement,
  useEffect,
  useState,
} from "react";
import isEmpty from "lodash/isEmpty";
import {
  DataListHeader,
  DataListItemType,
  DataListItemTypeFromHeader,
  DataListObject,
} from "./DataList.types";
import styles from "./DataList.css";
import { EmptyState, EmptyStateProps } from "./components/EmptyState";
import {
  BREAKPOINTS,
  BREAKPOINT_SIZES,
  Breakpoints,
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import { DataListLayoutProps } from "./components/DataListLayout";
import { DataListTags } from "./components/DataListTags";
import { FormatDate } from "../FormatDate";
import { Text } from "../Text";

/**
 * Return the child component that matches the `type` provided
 */
export function getCompoundComponent<T>(
  children: ReactElement | ReactElement[],
  type: ReactElement<T>["type"],
): ReactElement<T> | undefined {
  const childrenArray = Children.toArray(children);
  const element = childrenArray.find(
    child => isValidElement<T>(child) && child.type === type,
  );

  // Comply with the return type without casting it
  return isValidElement<T>(element) ? element : undefined;
}

/**
 * Return all instances child component that matches the `type` provided
 */
export function getCompoundComponents<T>(
  children: ReactElement | ReactElement[],
  type: ReactElement<T>["type"],
): ReactElement<T>[] {
  const childrenArray = Children.toArray(children);
  const elements = childrenArray.filter(
    (child): child is ReactElement<T> =>
      isValidElement<T>(child) && child.type === type,
  );

  // Comply with the return type without casting it
  return elements || [];
}

/**
 * Generate the default elements the DataList would use on the data provided.
 */
export function generateListItemElements<T extends DataListObject>(data: T[]) {
  type DataListElements = DataListItemType<typeof data>;

  return data.map(item =>
    Object.keys(item).reduce((acc, key: keyof DataListElements) => {
      const currentItem = item[key];

      if (!currentItem) {
        return acc;
      }

      if (key === "tags" && Array.isArray(currentItem)) {
        acc[key] = <DataListTags items={currentItem} />;
      } else if (key === "label" && typeof currentItem === "string") {
        acc[key] = <Text>{currentItem}</Text>;
      } else if (isValidElement(currentItem)) {
        acc[key] = currentItem;
      } else if (currentItem instanceof Date) {
        acc[key] = (
          <Text variation="subdued">
            <FormatDate date={currentItem} />
          </Text>
        );
      } else {
        acc[key] = <Text variation="subdued">{currentItem}</Text>;
      }

      return acc;
    }, {} as DataListElements),
  );
}

/**
 * Generate the header elements with the default styling
 */
export function generateHeaderElements<T extends DataListObject>(
  headers: DataListHeader<T>,
) {
  const headerElements = Object.keys(headers).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (
        <div className={styles.headerLabel}>
          <Text variation="subdued" maxLines="single" size="small">
            {headers[key]}
          </Text>
        </div>
      ),
    }),
    {} as DataListItemTypeFromHeader<T, typeof headers>,
  );

  return isEmpty(headerElements) ? undefined : headerElements;
}

interface UseDataListEmptyStateProps {
  readonly children?: ReactElement | ReactElement[];
  readonly isFilterApplied: boolean;
  readonly setIsFilterApplied: (isFilterApplied: boolean) => void;
}

/**
 * Modify EmptyState to include an empty filter results when filtering happens
 */
export function generateDataListEmptyState({
  children,
  isFilterApplied,
  setIsFilterApplied,
}: UseDataListEmptyStateProps):
  | React.ReactElement<EmptyStateProps>
  | undefined {
  if (!children) return;

  const EmptyStateComponent = getCompoundComponent<EmptyStateProps>(
    children,
    EmptyState,
  );

  if (isFilterApplied && isValidElement(EmptyStateComponent)) {
    let overrideEmptyStateProps: EmptyStateProps | undefined;

    if (isFilterApplied) {
      overrideEmptyStateProps = {
        message: EMPTY_FILTER_RESULTS_MESSAGE,
        action: {
          label: EMPTY_FILTER_RESULTS_ACTION_LABEL,
          onClick: () => {
            setIsFilterApplied(false);
            alert("Filters Cleared");
          },
        },
      };
    }

    return React.cloneElement<EmptyStateProps>(
      EmptyStateComponent,
      overrideEmptyStateProps,
    );
  }

  return EmptyStateComponent;
}

/**
 * Render the data list items with the layout that
 * should be visible based on its size prop and the size props of the other layouts
 */
export function renderDataListItems<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  elementData: DataListItemType<T[]>[],
  mediaMatches?: Record<Breakpoints, boolean>,
) {
  return renderDataListLayouts(
    layouts,
    (layout: React.ReactElement<DataListLayoutProps<T>>) => {
      return elementData.map((child, i) => {
        // TODO: Don't use index as key. Might have to force an ID on the data JOB-76773
        return (
          <div className={styles.listItem} key={`${i}-${child.id}`}>
            {layout.props.children(child)}
          </div>
        );
      });
    },
    mediaMatches,
  );
}

/**
 * Render the data list header with the layout that
 * should be visible based on its size prop and the size props of the other layouts
 */
export function renderDataListHeader<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  headerData?: DataListItemTypeFromHeader<T, DataListHeader<T>>,
  mediaMatches?: Record<Breakpoints, boolean>,
) {
  return renderDataListLayouts(
    layouts,
    (layout: React.ReactElement<DataListLayoutProps<T>>) => {
      const showHeader = layout.props.showHeader ?? true;
      return (
        showHeader &&
        headerData && (
          <div className={styles.header}>
            {layout.props.children(headerData)}
          </div>
        )
      );
    },
    mediaMatches,
  );
}

/**
 * Helper function that will render the layout that should be visible based on
 * its size prop and the size props of the other layouts
 */
function renderDataListLayouts<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  renderLayout: (
    layout: React.ReactElement<DataListLayoutProps<T>>,
  ) => ReactNode,
  mediaMatches?: Record<Breakpoints, boolean>,
) {
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
  return layoutToRender && renderLayout(layoutToRender);
}

/**
 * Determine is layout is visible by checking a media query matches for the
 * visible sizes of the layout and there isn't a larger layout that should be rendered
 */
function isLayoutVisible({
  layoutSize,
  mediaMatches,
  sizePropsOfLayouts,
}: {
  layoutSize: Breakpoints;
  mediaMatches?: Record<Breakpoints, boolean>;
  sizePropsOfLayouts?: Breakpoints[];
}) {
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
  return (
    visibleBreakpoints.some(breakpoint => {
      return Boolean(mediaMatches?.[breakpoint]);
    }) &&
    largerBreakpointsToHide?.reduce<boolean>((acc, breakpoint) => {
      return acc && !mediaMatches?.[breakpoint];
    }, true)
  );
}

export function sortSizeProp(sizeProp: Breakpoints[]) {
  return sizeProp.sort(
    (a, b) => BREAKPOINTS.indexOf(a) - BREAKPOINTS.indexOf(b),
  );
}

export function useGridLayoutMediaQueries() {
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
  // Set up mediaQuery event handlers
  useEffect(() => {
    const handlers = BREAKPOINTS.reduce((previous, breakpoint) => {
      const handler = (e: MediaQueryListEvent) =>
        setMatches(previousMatches => ({
          ...previousMatches,
          [breakpoint]: e.matches,
        }));
      mediaQueries[breakpoint].addEventListener("change", handler);
      return { ...previous, [breakpoint]: handler };
    }, {} as Record<Breakpoints, (e: MediaQueryListEvent) => void>);
    return () => {
      BREAKPOINTS.map(breakpoint => {
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
