import React, { Children, ReactElement, isValidElement } from "react";
import isEmpty from "lodash/isEmpty";
import {
  DataListHeader,
  DataListItemTypeFromHeader,
  DataListObject,
} from "./DataList.types";
import styles from "./DataList.css";
import { BREAKPOINTS, Breakpoints } from "./DataList.const";
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

  return elements;
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

export function sortSizeProp(sizeProp: Breakpoints[]) {
  return sizeProp.sort(
    (a, b) => BREAKPOINTS.indexOf(a) - BREAKPOINTS.indexOf(b),
  );
}
