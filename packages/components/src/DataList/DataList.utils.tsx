import React, { Children, ReactElement, isValidElement } from "react";
import {
  DataListHeader,
  DataListItemType,
  DataListItemTypeFromHeader,
  DataListObject,
} from "./DataList.types";
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
  type DataListElements = DataListItemType<typeof data>;

  return data.map(item =>
    Object.keys(item).reduce((acc, key: keyof DataListElements) => {
      const currentItem = item[key];

      if (!currentItem) {
        return acc;
      }

      if (key === "tags" && Array.isArray(currentItem)) {
        acc[key] = (
          // TODO: Create a component specific for this with the experience we want
          <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
            {currentItem.map((tag, index) => (
              <InlineLabel key={index}>{tag}</InlineLabel>
            ))}
          </div>
        );
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

export function generateHeaderFromData<T extends DataListObject>(
  headers: DataListHeader<T>,
) {
  return Object.keys(headers).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (
        <Text variation="subdued" maxLines="single" size="small">
          <b className={styles.headerLabel}>{headers[key]}</b>
        </Text>
      ),
    }),
    {} as DataListItemTypeFromHeader<typeof headers>,
  );
}
