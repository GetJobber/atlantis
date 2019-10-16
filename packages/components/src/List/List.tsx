import React from "react";
import { groupBy } from "lodash";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Heading } from "../Heading";

interface ListProps {
  /**
   * Array of the list items.
   *
   * {@link https://atlantis.frend.space/components/list#list-item-props List Item Props}
   */
  readonly items: ListItemProps[];

  /**
   * When paired with `section` props in the `ListItem` component,
   * this determines how to group the list items. It does nothing on its own.
   */
  readonly sectioned?: boolean;
}

export function List({ items, sectioned }: ListProps) {
  if (sectioned) {
    return <SectionedList items={items} />;
  } else {
    return <DisplayList items={items} />;
  }
}

function DisplayList({ items }: Pick<ListProps, "items">) {
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

function SectionedList({ items }: Pick<ListProps, "items">) {
  const sectionedItems = groupBy(items, "section");

  return (
    <ul className={styles.list}>
      {Object.keys(sectionedItems).map(section => (
        <li key={section} className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading level={4}>{section}</Heading>
          </div>

          <ul className={styles.list}>
            {sectionedItems[section].map(item => (
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
