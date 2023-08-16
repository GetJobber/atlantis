import React, { Children, ReactElement, isValidElement } from "react";
import { DataListItemType, DataListObject } from "./DataList.types";
import styles from "./DataList.css";
import { FormatDate } from "../FormatDate";
import { InlineLabel } from "../InlineLabel";
import { Text } from "../Text";

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

export function generateElementsFromData<T extends DataListObject>(data: T[]) {
  return data.map(item =>
    Object.keys(item).reduce((acc, key) => {
      const currentItem = item[key];

      if (!currentItem) {
        return acc;
      }

      if (key === "tags" && Array.isArray(currentItem)) {
        return {
          ...acc,
          [key]: currentItem.map((tag, index) => (
            <InlineLabel key={index}>{tag}</InlineLabel>
          )),
        };
      }

      if (key === "label" && typeof currentItem === "string") {
        return {
          ...acc,
          [key]: <Text>{currentItem}</Text>,
        };
      }

      if (isValidElement(currentItem)) {
        return { ...acc, [key]: currentItem };
      }

      if (currentItem instanceof Date) {
        return {
          ...acc,
          [key]: (
            <Text variation="subdued">
              <FormatDate date={currentItem} />
            </Text>
          ),
        };
      }

      return { ...acc, [key]: <Text variation="subdued">{currentItem}</Text> };
    }, {} as DataListItemType<typeof data>),
  );
}

export function generateHeaderFromData<T extends DataListObject>(data: T[]) {
  return Object.keys(data[0]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (
        <Text variation="subdued" maxLines="single" size="small">
          <b className={styles.headerLabel}>{key}</b>
        </Text>
      ),
    }),
    {} as DataListItemType<typeof data>,
  );
}
