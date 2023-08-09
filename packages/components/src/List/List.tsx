import React from "react";
import classnames from "classnames";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
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
