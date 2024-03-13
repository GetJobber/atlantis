/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import classnames from "classnames";
import styles from "./List.css";
import sectionStyles from "./SectionHeader.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Typography } from "../Typography";

interface ListProps {
  /**
   * Array of the list items.
   */
  readonly items: ListItemProps[];
}

export function List({ items }: ListProps) {
  const isSectioned = items.some(item => item.section);

  if (isSectioned) {
    return <SectionedList items={items} />;
  } else {
    return <DisplayList items={items} />;
  }
}

function DisplayList({ items }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          <ListItem {...item} />
        </li>
      ))}
    </ul>
  );
}

const get = (obj: any, path: any, defValue: any) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value
  const result = pathArray.reduce(
    (prevObj: any, key: any) => prevObj && prevObj[key],
    obj,
  );

  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = key(item);

    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);

    return result;
  }, {} as Record<string, T[]>);
}

function SectionedList({ items }: ListProps) {
  const sectionedItems = groupBy(items, item => get(item, "section", "Other"));
  const sectionHeaderClassNames = classnames(sectionStyles.sectionHeader);

  return (
    <ul className={styles.list}>
      {Object.keys(sectionedItems).map(sectionName => (
        <li key={sectionName} className={styles.section}>
          <div className={sectionHeaderClassNames}>
            <Typography element="h4" fontWeight="bold" size="large">
              {sectionName}
            </Typography>
          </div>

          <ul className={styles.list}>
            {sectionedItems[sectionName].map(item => (
              <li key={item.id} className={styles.item}>
                <ListItem {...item} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
