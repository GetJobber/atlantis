import React, {
  Children,
  ReactElement,
  ReactNode,
  isValidElement,
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
    {} as DataListItemTypeFromHeader<typeof headers>,
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

export function renderDataListItems<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  elementData: DataListItemType<T[]>[],
) {
  return renderDataListLayouts(
    layouts,
    (layout: React.ReactElement<DataListLayoutProps<T>>) => {
      return elementData.map((child, i) => {
        // TODO: Don't use index as key. Might have to force an ID on the data JOB-76773
        return (
          <div className={styles.listItem} key={`${i}`}>
            {layout.props.children(child)}
          </div>
        );
      });
    },
  );
}

export function renderDataListHeader<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  headerData?: DataListItemTypeFromHeader<DataListHeader<T>>,
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
  );
}

function renderDataListLayouts<T extends DataListObject>(
  layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined,
  renderLayout: (
    layout: React.ReactElement<DataListLayoutProps<T>>,
  ) => ReactNode,
) {
  const sizePropsOfLayouts = layouts?.map(layout => layout.props.size || "xs");
  return layouts?.map((layout, index) => {
    const layoutSize = layout.props.size || "xs";
    const largerBreakpointsToHide = sizePropsOfLayouts?.filter(
      size => BREAKPOINTS.indexOf(size) > BREAKPOINTS.indexOf(layoutSize),
    );
    const cssVars = getCSSVariablesForBreakpoints(
      layoutSize,
      largerBreakpointsToHide,
    );
    return (
      <div
        style={cssVars}
        key={`${index}-${layoutSize}`}
        className={styles.layout}
      >
        {renderLayout(layout)}
      </div>
    );
  });
}

export function sortSizeProp(sizeProp: Breakpoints[]) {
  return sizeProp.sort(
    (a, b) => BREAKPOINTS.indexOf(a) - BREAKPOINTS.indexOf(b),
  );
}

function getCSSVariablesForBreakpoints(
  sizeProp: Breakpoints,
  largerBreakpoints?: Breakpoints[],
) {
  const sortedLargerBreakpoints = sortSizeProp(largerBreakpoints || []);
  const visibleBreakpoints = BREAKPOINTS.slice(
    BREAKPOINTS.indexOf(sizeProp),
    sortedLargerBreakpoints[0]
      ? BREAKPOINTS.indexOf(sortedLargerBreakpoints[0])
      : undefined,
  );

  return BREAKPOINTS.reduce((acc, breakpoint) => {
    const displayValue = visibleBreakpoints.includes(breakpoint)
      ? "block"
      : "none";
    return {
      ...acc,
      [`--data-list-${breakpoint}-display`]: displayValue,
    };
  }, {} as Record<string, string>);
}
