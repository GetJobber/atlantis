import React, { Children, ReactElement, isValidElement } from "react";
import isEmpty from "lodash/isEmpty";
import {
  DataListHeader,
  DataListItemType,
  DataListItemTypeFromHeader,
  DataListObject,
} from "./DataList.types";
import { BREAKPOINTS, Breakpoints } from "./DataList.const";
import { DataListTags } from "./components/DataListTags";
import { DataListHeaderTile } from "./components/DataListHeaderTile/DataListHeaderTile";
import { FormatDate } from "../FormatDate";
import { Text } from "../Text";
import { Heading } from "../Heading";

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

  return elements;
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
        acc[key] = <Heading level={5}>{currentItem}</Heading>;
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
      [key]: <DataListHeaderTile headers={headers} headerKey={key} />,
    }),
    {} as DataListItemTypeFromHeader<T, typeof headers>,
  );

  return isEmpty(headerElements) ? undefined : headerElements;
}

export function sortSizeProp(sizeProp: Breakpoints[]) {
  return sizeProp.sort(
    (a, b) => BREAKPOINTS.indexOf(a) - BREAKPOINTS.indexOf(b),
  );
}
export function getExposedActions(childrenArray: ReactElement[]) {
  const firstTwoChildren = childrenArray.slice(0, 2);

  return firstTwoChildren.reduce((result: typeof childrenArray, child, i) => {
    const hasIcon = Boolean(child.props.icon);

    const isFirstChild = i === 0;
    if (isFirstChild && hasIcon) {
      return [...result, child];
    }

    const isSecondChild = i === 1;
    const hasFirstChild = result.length === 1;
    if (isSecondChild && hasIcon && hasFirstChild) {
      return [...result, child];
    }

    return result;
  }, []);
}
