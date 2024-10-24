import React from "react";
import classnames from "classnames";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import { Typography } from "@jobber/components/Typography";
import {
  BaseListItemProps,
  ListItem,
  ListItemProps,
} from "@jobber/components/List/ListItem";
import sectionStyles from "./SectionHeader.module.css";
import styles from "./List.module.css";

interface ListProps<T extends BaseListItemProps = ListItemProps> {
  /**
   * Array of the list items.
   */
  readonly items: T[];
  /**
   * A function that will be called for each item instead of the default
   * rendering
   */
  readonly customRenderItem?: (item: T) => React.ReactNode;
}

export function List<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
}: ListProps<T>) {
  const isSectioned = items.some(item => "section" in item && item.section);

  if (isSectioned) {
    return <SectionedList items={items} customRenderItem={customRenderItem} />;
  } else {
    return <DisplayList items={items} customRenderItem={customRenderItem} />;
  }
}

function DisplayList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
}: ListProps<T>) {
  return (
    <ul className={styles.list}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          <ListItem {...item} customRenderItem={customRenderItem} />
        </li>
      ))}
    </ul>
  );
}

function SectionedList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
}: ListProps<T>) {
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
                <ListItem {...item} customRenderItem={customRenderItem} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
